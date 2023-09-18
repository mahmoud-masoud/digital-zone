import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { auth, db } from '../../Utils/firebase';
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

const AddToCartBox = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [sendingProduct, setSendingProduct] = useState(false);
  const favorites = useSelector((state) => state.favorites.favoritesItems);

  const totalPrice = favorites.reduce((prev, curr) => {
    return (prev += curr.neededQuantity * curr.price);
  }, 0);

  const addAllFavoritesItemsToCart = () => {
    const addToCart = async (productsToAdd = []) => {
      if (!productsToAdd.length) {
        console.error('No products to add to the cart.');
        return;
      }

      setSendingProduct(true);

      try {
        const userUID = user.uid;
        const userRef = doc(db, 'users', userUID);
        const cartItemsRef = collection(userRef, 'cartItems');

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
          })
        );

        // Commit the batched writes
        await batch.commit();

        setSendingProduct(false);
      } catch (error) {
        console.error(error);
        setSendingProduct(false);
      }
    };

    addToCart(favorites);
  };
  return (
    <section
      className='sticky bg-white top-[74px] md:top-24 -order-1 md:order-1
    w-full p-4 md:w-1/3  min-w-[300px] 
    md:shadow-card-shadow md:p-6 md:rounded-lg '
    >
      <div className='flex gap-4 items-end md:block md:bb-2 pb-4'>
        <h2 className='font-bold text-xl'>{`$${totalPrice}`}</h2>
        <span className='text-sm'>Estimated total</span>
      </div>
      <button
        className='w-full rounded-full bg-primary hover:bg-after
         text-white px-2 py-2 font-bold text-sm md:mt-4'
        onClick={addAllFavoritesItemsToCart}
      >
        {sendingProduct ? 'Sending Products...' : 'Add all products to cart'}
      </button>
    </section>
  );
};
export default AddToCartBox;
