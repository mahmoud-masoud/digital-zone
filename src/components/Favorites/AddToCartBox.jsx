import { useState } from "react";
import { auth, db } from "../../Utils/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import formatePrice from "../../Utils/formatePrice";
import LightSpinner from "../../UI/LightSpinner";

const AddToCartBox = ({ data }) => {
  const [user] = useAuthState(auth);

  const [addingProducts, setAddingProducts] = useState(false);

  const totalPrice = data?.reduce((prev, curr) => {
    return (prev += curr.neededQuantity * curr.price);
  }, 0);

  const addFavoritesToCart = async () => {
    setAddingProducts(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const cartItemsRef = collection(userRef, "cartItems");

      // Create a batch so i can make multiple operations at the same time
      const batch = writeBatch(db);

      await Promise.all(
        data.map(async (product) => {
          const { id, title, price, image } = product;
          const productRef = doc(cartItemsRef, id);

          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            batch.update(productRef, {
              quantity: increment(product.neededQuantity),
              totalPrice: increment(price * product.neededQuantity),
            });
          } else {
            const productWithTimestamp = {
              title,
              price,
              totalPrice: price,
              id,
              quantity: product.neededQuantity,
              image,
              timestamp: serverTimestamp(),
            };

            batch.set(productRef, productWithTimestamp);
          }
        }),
      );

      // Commit the batched writes
      await batch.commit();

      setAddingProducts(false);
    } catch (error) {
      console.error(error);
      setAddingProducts(false);
    }
  };

  return (
    <section
      className="sticky top-[74px] z-40 -order-1 w-full min-w-[300px] border
    border-b-2 bg-white p-4 shadow-sm md:top-24 
    md:order-1 md:w-1/3 md:rounded-lg md:p-6"
    >
      <div className="md:bb-2 flex items-end gap-4 pb-4 md:block">
        <h2 className="text-xl font-bold">{formatePrice(totalPrice)}</h2>
        <span className="text-sm">Estimated total</span>
      </div>

      <button
        className="h-10 w-full rounded-full bg-primary px-2
         py-2 text-sm font-bold text-white hover:bg-after md:mt-4"
        onClick={() => addFavoritesToCart()}
      >
        <div className="flex items-center justify-center gap-3">
          {addingProducts && <LightSpinner className={"h-6 w-6"} />}
          <span>Add all to cart</span>
        </div>
      </button>
    </section>
  );
};
export default AddToCartBox;
