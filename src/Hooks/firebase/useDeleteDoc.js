import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Utils/firebase";

const useDeleteDoc = (collectionName) => {
  const deleteDocHandler = async (docId) => {
    try {
      // Check in a specific collection by ID
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        console.log(
          `Product with ID ${docId} deleted from specific collection.`,
        );
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
            console.log(
              `Product with ID ${docId} deleted from collection group.`,
            );
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

      console.log(`Product with ID ${docId} not found.`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return { deleteDocHandler };
};
export default useDeleteDoc;
