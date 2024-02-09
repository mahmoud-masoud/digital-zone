import HeartIcon from "../../UI/HeartIcon";
import { useEffect, useState } from "react";
import { addProductToFavorites } from "../../Utils/firebase-functions";
import { auth, db } from "../../Utils/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import LoginPopup from "../../UI/LoginPopup";
import { AnimatePresence } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";

const AddToFavoritesBtn = ({ title, price, id, image }) => {
  const [user] = useAuthState(auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoginPopup, setLoginPopup] = useState(false);

  const closePopup = () => {
    setLoginPopup(false);
  };

  const addItemToFavList = (e) => {
    e.preventDefault();

    if (user?.isAnonymous || !user) {
      setLoginPopup(true);
      return;
    }
    addProductToFavorites(user.uid, { title, price, image, id });
  };

  useEffect(() => {
    if (user?.isAnonymous || !user) return;

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
        {(user?.isAnonymous || !user) && isLoginPopup && (
          <LoginPopup closePopup={closePopup} />
        )}
      </AnimatePresence>
    </>
  );
};
export default AddToFavoritesBtn;
