import { auth, db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  addDoc,
  collection,
  getDoc,
  doc,
  getDocFromServer,
  setDoc,
  getDocsFromCache,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  runTransaction,
  increment,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export async function getCurrentUserUID() {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        return user.uid;
      } else {
        throw new Error("Un auth user");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export const uploadImages = async (urls, category, productId) => {
  const imagesUrls = [];

  try {
    for (const imgUrl of urls) {
      if (!imgUrl.startsWith("blob")) {
        console.log(imgUrl);
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

    console.log(imagesUrls);
  } catch (error) {
    console.log(error);
  }

  return imagesUrls;
};

export const addProduct = async (category, props) => {
  try {
    const docRef = await addDoc(collection(db, category), {
      ...props,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getProduct = async (category, docId) => {
  const docRef = doc(db, category, docId);
  const docSnap = await getDocFromServer(docRef);

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getProductsByCategory = async (category) => {
  const docs = [];
  try {
    const querySnapshot = await getDocs(collection(db, category));

    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }

  return docs;
};

export const addingUserToUsersCollection = async (userData, userUID) => {
  try {
    const docRef = doc(db, "users", userUID);
    await setDoc(docRef, userData);
    console.log("Document written with ID: ", userUID);
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

    const { displayName, email, uid } = userCredential.user;

    addingUserToUsersCollection({ displayName, email, uid }, uid);
  } catch (error) {
    return error.code;
  }
};

export const removeProductFromFavorites = async (userUID, productId) => {
  try {
    const userRef = doc(db, "users", userUID);

    const favoritesRef = collection(userRef, "favorites");

    const productRef = doc(favoritesRef, productId);
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (productDoc.exists()) {
        transaction.delete(productRef);
      } else {
        throw new Error("product not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserFavorites = async (userUID) => {
  try {
    const userRef = doc(db, "users", userUID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favorites;
      return userFavorites;
    } else throw new Error("you must be logged in");
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (userUID, product) => {
  try {
    const userRef = doc(db, "users", userUID);

    const cartItemsRef = collection(userRef, "cartItems");

    const productRef = doc(cartItemsRef, product.id);
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (productDoc.exists()) {
        // Product exists in the cart, update its quantity

        transaction.update(productRef, {
          quantity: increment(1),
          totalPrice: increment(product.price),
        });
        console.log("update product quantity");
      } else {
        // Product doesn't exist in the cart, add a new document
        const productWithTimestamp = {
          ...product,
          timestamp: serverTimestamp(),
        };

        transaction.set(productRef, productWithTimestamp);
        console.log("add new product to cart items");
      }
    });
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

export const removeProductPermanentlyFromTheCart = async (
  userUID,
  productId,
) => {
  try {
    const userRef = doc(db, "users", userUID);

    const cartItemsRef = collection(userRef, "cartItems");

    const productRef = doc(cartItemsRef, productId);
    await runTransaction(db, async (transaction) => {
      transaction.delete(productRef);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartItems = async (userUID) => {
  const userRef = doc(db, "users", userUID);

  const cartItemsRef = collection(userRef, "cartItems");

  const querySnapshot = await getDocs(cartItemsRef);
  const res = querySnapshot.docs.map((doc) => doc.data());
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
        console.log("remove product from favorites");
      } else {
        // Product doesn't exist in the cart, add a new document
        const productWithTimestamp = {
          ...product,
          neededQuantity: 1,
          timestamp: serverTimestamp(),
        };

        transaction.set(productRef, productWithTimestamp);
        console.log("add new product to favorites");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNeededQuantity = async (
  userUID,
  productID,
  neededQuantity,
) => {
  try {
    const userRef = doc(db, "users", userUID);

    const favoritesRef = collection(userRef, "favorites");

    const productRef = doc(favoritesRef, productID);
    await runTransaction(db, async (transaction) => {
      transaction.update(productRef, {
        neededQuantity,
      });
      console.log("update needed quantity");
    });
  } catch (error) {
    console.log(error);
  }
};
