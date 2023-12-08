import useNoScroll from "../../../Hooks/useNoScroll";
import Backdrop from "./Backdrop";
import { AlertOctagon, Turtle, X } from "lucide-react";
import {
  doc,
  deleteDoc,
  onSnapshot,
  collectionGroup,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../Utils/firebase";
import { Navigate, createPath, redirect, useNavigate } from "react-router-dom";
import { Modal } from "@nextui-org/react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const DeleteProductModal = ({ closeModal, productId }) => {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", productId),
    );

    // Subscribe to real-time updates with onSnapshot
    try {
      onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const productRef = querySnapshot.docs[0].ref;
          deleteDoc(productRef);
          navigate(-1);
        } else {
          // Product not found
          console.log("There is no document with this ID");
        }
      });
    } catch (error) {
      console.log(error);
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
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "50%", scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-10 w-full sm:w-[500px]"
        >
          <div className=" rounded p-2">
            <div className="rounded-md bg-white p-4">
              <h2 className="mb-4 text-lg font-bold">Modal Title</h2>
              <p>Modal content goes here.</p>
              <button
                className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>,
    document.getElementById("modal"),
  );
};
export default DeleteProductModal;
