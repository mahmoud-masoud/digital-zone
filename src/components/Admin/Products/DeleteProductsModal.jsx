import {
  collectionGroup,
  where,
  query,
  getDocs,
  writeBatch,
  runTransaction,
} from "firebase/firestore";

import { db } from "../../../Utils/firebaseConfig";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LightSpinner from "../../../UI/LightSpinner";
import { deleteProductImages } from "../../../Utils/firebase-functions";

const DeleteProductsModal = ({ closeModal, productsIds, removeRows }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProducts = async () => {
    setIsDeleting(true);

    try {
      await runTransaction(db, async () => {
        const batch = writeBatch(db);

        for (const productId of productsIds) {
          // Find the product in firestore db
          const q = query(
            collectionGroup(db, "products"),
            where("id", "==", productId),
          );

          const productDoc = (await getDocs(q)).docs[0];

          //get the product category and the product ref
          const { category } = productDoc.data();
          const productRef = productDoc.ref;

          batch.delete(productRef);

          //pass the product images path to be deleted
          await deleteProductImages(`${category}/${productId}`);
        }

        await batch.commit();
      });

      setIsDeleting(false);
      closeModal();
      removeRows();
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting products:", error);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 opacity-50"
        onClick={closeModal}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="p-2">
          <div
            className="flex flex-col items-center justify-center
             overflow-hidden rounded-xl bg-white"
          >
            <div className="flex flex-col items-center justify-center p-4">
              <span className=" rounded-full bg-rose-100 p-4">
                <ExclamationTriangleIcon className="h-8 w-8 rounded-full text-red-600" />
              </span>
              <span className="py-3 text-lg font-semibold md:text-xl">
                Delete products
              </span>
              <p className="text-center text-sm">
                Are you sure you want to delete
                <span className="inline-flex px-1 font-bold">
                  {productsIds.length}
                </span>
                products ? This can’t be undone.
              </p>
            </div>
            <div className="mt-2 w-full bg-slate-50 p-4 sm:mt-5">
              {isDeleting ? (
                <button className="ml-auto block w-20 rounded-lg bg-zinc-400 px-4 py-1.5">
                  <LightSpinner />
                </button>
              ) : (
                <div className="flex gap-4 max-sm:flex-col sm:justify-end">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-1.5
                       hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteProducts();
                      // removeRows();
                    }}
                    className="rounded-lg bg-rose-600 px-4 py-1.5 font-medium
                       text-white hover:bg-rose-700
                       max-sm:-order-1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal"),
  );
};
export default DeleteProductsModal;
