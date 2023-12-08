import { useEffect, useState } from "react";
import Address from "./Address";
import AddressForm from "./AddressForm";
import useUserInfo from "../../Hooks/useUserInfo";
import { auth, db } from "../../Utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { userShippingInfoActions } from "../../store/userShippingInfo";

const AddressWrapper = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [userAddress, setUserAddress] = useState(null);
  const [userAddressLoading, setUserAddressLoading] = useState(true);
  const [formIsVisible, setFormVisibility] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userRef,
      (userDoc) => {
        if (userDoc.exists()) {
          const fetchedUserAddress = userDoc.data().addressDetails;
          if (fetchedUserAddress) {
            setUserAddress(fetchedUserAddress);
            setFormVisibility(false);
            dispatch(
              userShippingInfoActions.addUserAddress(fetchedUserAddress),
            );
          } else setFormVisibility(true);
          setUserAddressLoading(false);
        }
      },
      (error) => {
        setUserAddressLoading(false);
        console.error("Error getting user document:", error);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return userAddressLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p className="mb-10 text-2xl font-semibold">Shipping address</p>

      {userAddress && (
        <Address
          setFormVisibility={setFormVisibility}
          userAddress={userAddress}
        />
      )}
      {formIsVisible && (
        <AddressForm
          userAddress={userAddress}
          setFormVisibility={setFormVisibility}
        />
      )}
    </div>
  );
};
export default AddressWrapper;
