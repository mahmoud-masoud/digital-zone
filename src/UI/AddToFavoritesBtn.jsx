import HeartIcon from "./HeartIcon";
import { useEffect, useState } from "react";
import { addProductToFavorites } from "../Utils/firebase-functions";
import { auth, db } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import LoginPopup from "./LoginPopup";
import { AnimatePresence } from "framer-motion";

const AddToFavoritesBtn = ({ title, price, id, image }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const closePopup = () => {
    setPopup(false);
  };

  const addItemToFavList = (e) => {
    e.preventDefault();

    if (auth.currentUser?.isAnonymous || !auth.currentUser) {
      setPopup(true);
      return;
    }
    addProductToFavorites(user.uid, { title, price, image, id });
  };

  useEffect(() => {
    if (auth.currentUser?.isAnonymous || !auth.currentUser) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const favoriteItemRef = collection(userRef, "favorites");

      const q = query(favoriteItemRef, where("id", "==", id));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setIsFavorite(true);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.log("error from catch", error);
    }
  }, [user]);

  return (
    <>
      <button
        className="flex h-8 w-8 items-center justify-center
         rounded-full p-0.5"
        onClick={addItemToFavList}
      >
        <HeartIcon className="" isFavorite={isFavorite} id={id} />
      </button>

      <AnimatePresence>
        {(auth.currentUser?.isAnonymous || !auth.currentUser) && isPopup && (
          <LoginPopup closePopup={closePopup} />
        )}
      </AnimatePresence>
    </>
  );
};
export default AddToFavoritesBtn;
