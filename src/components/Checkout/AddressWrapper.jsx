import { useEffect, useState } from "react";
import Address from "./Address";
import AddressForm from "./AddressForm";
import { auth, db } from "../../Utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { userShippingInfoActions } from "../../store/userShippingInfo";
import { useAuthState } from "react-firebase-hooks/auth";

const AddressWrapper = () => {
  const [user, isLoading, isError] = useAuthState(auth);
  const [userShippingInfo, setUserShippingInfo] = useState(null);
  const [shippingInfoLIsLoading, setShippingInfoIsLoading] = useState(true);
  const [formIsVisible, setFormVisibility] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (userDoc) => {
        if (userDoc.exists()) {
          const fetchedShippingInfo = userDoc.data().shippingInfo;
          if (fetchedShippingInfo) {
            setUserShippingInfo(fetchedShippingInfo);
            setFormVisibility(false);
            dispatch(
              userShippingInfoActions.addUserShippingInfo(fetchedShippingInfo),
            );
          } else setFormVisibility(true);
          setShippingInfoIsLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      setShippingInfoIsLoading(false);
      console.error("Error getting user document:", error);
    }
  }, [user, dispatch]);

  return shippingInfoLIsLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p className="mb-4 text-lg font-semibold md:mb-10 md:text-2xl">
        Shipping address
      </p>

      {userShippingInfo && (
        <Address
          setFormVisibility={setFormVisibility}
          userShippingInfo={userShippingInfo}
        />
      )}
      {formIsVisible && (
        <AddressForm
          userShippingInfo={userShippingInfo}
          setFormVisibility={setFormVisibility}
        />
      )}
    </div>
  );
};
export default AddressWrapper;
