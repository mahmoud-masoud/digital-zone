import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Utils/firebaseConfig";

const useDeleteDoc = (collectionName) => {
  const deleteDocHandler = async (docId) => {
    try {
      // Check in a specific collection by ID
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);

        return;
      }

      // Check in collection group
      const querySnapshot = await getDocs(
        query(collectionGroup(db, collectionName), where("id", "==", docId)),
      );

      if (!querySnapshot.empty) {
        // If product found in collection group, delete it
        const deletePromises = querySnapshot.docs.map(async (doc) => {
          try {
            await deleteDoc(doc.ref);
          } catch (deleteError) {
            console.error(
              `Error deleting product with ID ${docId}:`,
              deleteError,
            );
          }
        });

        await Promise.all(deletePromises);
        return;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return { deleteDocHandler };
};
export default useDeleteDoc;
