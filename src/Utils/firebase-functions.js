import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
} from 'firebase/firestore';
import { arrayMove } from '@dnd-kit/sortable';

export const uploadImages = async (blobUrls, category, title) => {
  const imagesUrls = [];
  let fileName = 0;
  try {
    for (const blobUrl of blobUrls) {
      const blobData = await fetch(blobUrl).then((response) => response.blob());
      const resFile = new File([blobData], fileName++, { type: blobData.type });

      const storageRef = ref(storage, `${category}/${title}/${resFile.name}`);
      const uploadedTask = await uploadBytes(storageRef, resFile);
      const url = await getDownloadURL(uploadedTask.ref);
      imagesUrls.push(url);
    }
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

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
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
    console.log('No such document!');
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

export const addNewUser = async (userData, userUID) => {
  try {
    const docRef = doc(db, 'users', userUID);
    await setDoc(docRef, userData);
    console.log('Document written with ID: ', userUID);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addProductToFavorites = async (userUID, product) => {
  try {
    const userRef = doc(db, 'users', userUID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favorites;

      const isProductExist = userFavorites.find(
        (favItem) => favItem.id === product.id
      );

      if (isProductExist) {
        await updateDoc(userRef, {
          favorites: arrayRemove(product),
        });
        console.log('remove product from fav');
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(product),
        });
        console.log('adding product to fav');
      }
    } else throw new Error('You must be logged in');
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromFavorites = async (userUID, productID) => {
  try {
    const userRef = doc(db, 'users', userUID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favorites;

      const isProductExist = userFavorites.find(
        (favItem) => favItem.id === productID
      );

      console.log(isProductExist);

      if (isProductExist)
        await updateDoc(userRef, {
          favorites: arrayRemove(isProductExist),
        });
      else throw new Error('No such a product');
    } else throw new Error('You must be logged in');
  } catch (error) {
    console.log(error);
  }
};

export const getUserFavorites = async (userUID) => {
  try {
    console.log('we here');
    const userRef = doc(db, 'users', userUID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favorites;
      return userFavorites;
    } else throw new Error('you must be logged in');
  } catch (error) {
    console.log(error);
  }
};
