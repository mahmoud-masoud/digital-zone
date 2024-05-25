import { auth, db, storage } from "./firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  runTransaction,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const uploadImages = async (urls, category, productId) => {
  const imagesUrls = [];

  try {
    for (const imgUrl of urls) {
      if (!imgUrl.startsWith("blob")) {
        imagesUrls.push(imgUrl);
        continue;
      }
      const blobData = await fetch(imgUrl).then((response) => response.blob());
      const resFile = new File(
        [blobData],
        Math.random() * 10 * Date.now() + 22,
        { type: blobData.type },
      );

      const storageRef = ref(
        storage,
        `${category}/${productId}/${resFile.name}`,
      );
      const uploadedTask = await uploadBytes(storageRef, resFile);

      const url = await getDownloadURL(uploadedTask.ref);

      imagesUrls.push(url);
    }
  } catch (error) {
    console.log(error);
  }

  return imagesUrls;
};

export const deleteProductImages = async (path) => {
  const productImagesFolderRef = ref(storage, path);
  try {
    const images = await listAll(productImagesFolderRef);

    return await Promise.all(
      images.items.map(async (imageRef) => {
        await deleteObject(imageRef);
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const addingUserToUsersCollection = async ({ uid, ...userData }) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { uid, ...userData });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createUser = async ({ email: userEmail, password, username }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password,
    );

    await updateProfile(userCredential.user, { displayName: username });

    const { displayName, email, uid, metadata } = userCredential.user;

    await addingUserToUsersCollection({
      displayName,
      email,
      uid,
      type: "regular",
      metadata: { ...metadata },
    });
  } catch (error) {
    return error.code;
  }
};

export const removeProductFromFavorites = async (userUID, productId) => {
  try {
    const userRef = doc(db, "users", userUID);

    const favoritesRef = collection(userRef, "favorites");

    const productRef = doc(favoritesRef, productId);

    await deleteDoc(productRef);
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromTheCart = async (
  userUID,
  productId,
  productPrice,
) => {
  try {
    const userRef = doc(db, "users", userUID);

    const cartItemsRef = collection(userRef, "cartItems");

    const productRef = doc(cartItemsRef, productId);
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (productDoc.exists()) {
        // Product exists in the cart, update its quantity

        if (productDoc.data().quantity > 1) {
          transaction.update(productRef, {
            quantity: increment(-1),
            totalPrice: increment(-productPrice),
          });
        } else {
          transaction.delete(productRef);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const addProductToFavorites = async (userUID, product) => {
  try {
    const userRef = doc(db, "users", userUID);

    const favoritesRef = collection(userRef, "favorites");

    const productRef = doc(favoritesRef, product.id);
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (productDoc.exists()) {
        // Product exists in the cart, update its quantity

        transaction.delete(productRef);
      } else {
        // Product doesn't exist in the cart, add a new document
        const productWithTimestamp = {
          ...product,
          neededQuantity: 1,
          timestamp: serverTimestamp(),
        };

        transaction.set(productRef, productWithTimestamp);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
