import { WalletIcon } from "@heroicons/react/24/solid";
import CreditCardFrom from "./CreditCardForm";
import SavedCard from "./SavedCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userShippingInfoActions } from "../../store/userShippingInfo";

const Payment = () => {
  const [user] = useAuthState(auth);
  const [userCreditCard, setUserCreditCard] = useState(null);
  const [formIsVisible, setFormVisibility] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userRef,
      (userDoc) => {
        if (userDoc.exists()) {
          const fetchedUserCreditCard = userDoc
            .data()
            .creditCard["cc-number"].slice(-4);
          dispatch(
            userShippingInfoActions.addUserCreditCard(fetchedUserCreditCard),
          );
          if (fetchedUserCreditCard) {
            setFormVisibility(false);
            setUserCreditCard(fetchedUserCreditCard);
          } else {
            setFormVisibility(true);
          }
        }
      },
      (error) => {
        console.error("Error getting user document:", error);
      },
    );

    return () => unsubscribe();
  }, [user, dispatch]);

  return (
    <section className="mt-10 rounded-lg border shadow-md">
      <div className="mb-4 flex items-center gap-4 rounded-t-lg bg-light p-3 md:p-6">
        <WalletIcon className="h-8 w-8 text-after" />

        <h2 className="text-lg font-semibold md:text-2xl">Payment</h2>
      </div>
      <div className="p-3 md:p-6">
        <div className="mb-8">
          <p className="mb-4 md:font-semibold">Pay with card</p>
          <div className="flex gap-2">
            <span>
              <img
                src="/images/Cards/visa.png"
                alt="visa logo"
                width={48}
                height={32}
              />
            </span>
            <span>
              <img
                src="/images/Cards/msCard.png"
                alt=""
                width={48}
                height={32}
              />
            </span>
            <span>
              <img
                src="/images/Cards/amExpress.svg"
                alt=""
                width={48}
                height={32}
              />
            </span>
          </div>
        </div>
        {formIsVisible && (
          <CreditCardFrom
            setFormVisibility={setFormVisibility}
            userCreditCard={userCreditCard}
          />
        )}

        {userCreditCard && !formIsVisible && (
          <>
            <SavedCard cardLastDigits={userCreditCard} />
            <button
              onClick={() => setFormVisibility(true)}
              className="pt-4 font-semibold text-primary"
            >
              Add New Card
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Payment;
