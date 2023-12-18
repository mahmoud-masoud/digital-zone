import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../../Utils/firebase";
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import formatePrice from "../../Utils/formatePrice";

const AddToCartBox = ({ data }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [sendingProduct, setSendingProduct] = useState(false);

  const totalPrice = data?.reduce((prev, curr) => {
    return (prev += curr.neededQuantity * curr.price);
  }, 0);

  const addAllFavoritesItemsToCart = () => {
    const addToCart = async (productsToAdd = []) => {
      if (!productsToAdd.length) {
        console.error("No products to add to the cart.");
        return;
      }

      setSendingProduct(true);

      try {
        const userUID = user.uid;
        const userRef = doc(db, "users", userUID);
        const cartItemsRef = collection(userRef, "cartItems");

        // Create a batched write object
        const batch = writeBatch(db);

        // Use forEach to add each product to the batch
        await Promise.all(
          productsToAdd.map(async (product) => {
            const { id, title, price, image } = product;
            const productRef = doc(cartItemsRef, id);

            // Check if the product exists and update it, or add it if it doesn't
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              batch.update(productRef, {
                quantity: increment(product.neededQuantity),
                totalPrice: increment(price * product.neededQuantity),
              });
              console.log(`Update quantity for product with ID ${id}`);
            } else {
              const productWithTimestamp = {
                title,
                price,
                totalPrice: price,
                id,
                quantity: 1,
                image,
                timestamp: serverTimestamp(),
              };

              batch.set(productRef, productWithTimestamp);
              console.log(`Add product with ID ${id} to cart items`);
            }
          }),
        );

        // Commit the batched writes
        await batch.commit();

        setSendingProduct(false);
      } catch (error) {
        console.error(error);
        setSendingProduct(false);
      }
    };

    addToCart(data);
  };
  return (
    <section
      className="sticky top-[70px] -order-1 w-full min-w-[300px] border
    border-b-2 bg-white p-4 shadow-sm  md:top-24 
    md:order-1 md:w-1/3 md:rounded-lg md:p-6"
    >
      <div className="md:bb-2 flex items-end gap-4 pb-4 md:block">
        <h2 className="text-xl font-bold">{formatePrice(totalPrice)}</h2>
        <span className="text-sm">Estimated total</span>
      </div>
      <button
        className="w-full rounded-full bg-primary px-2
         py-2 text-sm font-bold text-white hover:bg-after md:mt-4"
        onClick={addAllFavoritesItemsToCart}
      >
        {sendingProduct ? "Sending Products..." : "Add all products to cart"}
      </button>
    </section>
  );
};
export default AddToCartBox;
