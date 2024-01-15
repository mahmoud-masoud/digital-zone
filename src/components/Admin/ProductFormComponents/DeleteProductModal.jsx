import {
  deleteDoc,
  onSnapshot,
  collectionGroup,
  where,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../Utils/firebase";
import { useNavigate } from "react-router-dom";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import WhiteSpinner from "../../../UI/WhiteSpinner";

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
        await deleteDoc(productDocRef);
        setIsDeleting(false);
        navigate(-1);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "just", duration: 0.2 }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="p-2">
            <div
              className="flex flex-col items-center justify-center
             rounded-xl bg-white p-4 md:p-8 "
            >
              <span className=" rounded-full bg-rose-100 p-4">
                <ExclamationTriangleIcon
                  className="h-8 w-8 rounded-full 
            text-red-600"
                />
              </span>
              <span className="py-3 text-xl font-semibold">Delete product</span>
              <p className="text-center">
                Are you sure you want to delete this product ? This can’t be
                undone.
              </p>
              <div className="w-full pt-6">
                {isDeleting ? (
                  <button className="ml-auto block w-2/5 rounded-md bg-zinc-400 px-4 py-2.5">
                    <WhiteSpinner />
                  </button>
                ) : (
                  <div className="flex gap-8 ">
                    <button
                      onClick={closeModal}
                      className="flex-1 rounded-md border border-slate-600  px-6 py-2.5 hover:bg-light"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteProduct}
                      className="flex-1 rounded-md bg-rose-600 px-4 py-2.5 font-medium text-white hover:bg-rose-700"
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
