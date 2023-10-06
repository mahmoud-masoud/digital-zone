import { useEffect, useState } from 'react';

import Wrapper from '../../UI/Wrapper';

import ProductsCarousel from './ProductsCarousel';
import {
  collectionGroup,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../Utils/firebase.js';
import ProductsSkeleton from './ProductsSkeleton';

const BestSellers = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const tagToQuery = 'best seller';
    // Query for products with the specified tag

    const q = query(
      collectionGroup(db, 'products'),
      where('tags', 'array-contains', tagToQuery),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        return;
      }
      const productData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productData);
    });

    return () => unsubscribe;
  }, []);

  return (
    <section>
      <Wrapper className='py-8 md:py-12 px-4 border-b-2 border-gray-100'>
        {products ? (
          <>
            <h3 className='mb-8 text-lg md:text-xl font-bold text-fontColor'>
              Best Sellers
            </h3>
            <ProductsCarousel data={products} />
          </>
        ) : (
          <ProductsSkeleton />
        )}
      </Wrapper>
    </section>
  );
};
export default BestSellers;
