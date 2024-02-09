import {
  deleteDoc,
  collectionGroup,
  where,
  query,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LightSpinner from "../../../UI/LightSpinner";
import { deleteProductImages } from "../../../Utils/firebase-functions";

const DeleteProductModal = ({ closeModal, productId }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async () => {
    setIsDeleting(true);
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", productId),
    );

    try {
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const productDocRef = snapshot.docs[0].ref;
        const { category } = snapshot.docs[0].data();

        // Delete product images form firebase storage
        await deleteProductImages(`${category}/${productId}`);

        // Delete product form firestore db
        await deleteDoc(productDocRef);
        setIsDeleting(false);
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return createPortal(
    <>
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
                <span className="py-3 text-xl font-semibold">
                  Delete product
                </span>
                <p className="text-center">
                  Are you sure you want to delete this product ? This can’t be
                  undone.
                </p>
              </div>
              <div className="mt-2 w-full bg-slate-50 p-4 sm:mt-5">
                {isDeleting ? (
                  <button className="ml-auto block w-2/5 rounded-lg bg-zinc-400 p-2 px-4">
                    <LightSpinner />
                  </button>
                ) : (
                  <div className="flex gap-4 max-sm:flex-col sm:justify-end">
                    <button
                      onClick={closeModal}
                      className="rounded-lg border border-gray-300 bg-white p-2 px-4
                       hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteProduct}
                      className="rounded-lg bg-rose-600 p-2 px-4 font-medium
                       text-white hover:bg-rose-700
                       max-sm:-order-1"
                    >
                      Delete product
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>,
    document.getElementById("modal"),
  );
};
export default DeleteProductModal;
