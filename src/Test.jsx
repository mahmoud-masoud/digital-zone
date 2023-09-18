import { useEffect, useState } from 'react';
import { db } from './Utils/firebase';
import {
  collectionGroup,
  getDocs,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';

const Test = () => {
  const [data, setData] = useState();
  // useEffect(() => {
  //   // Create a query to fetch the product by ID
  //   const q = query(
  //     collectionGroup(db, 'products'),
  //     where('id', '==', 'E9XqSSZ8bPNpjRPxT5yh')
  //   );

  //   // Subscribe to real-time updates with onSnapshot
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     if (!querySnapshot.empty) {
  //       const productData = querySnapshot.docs((doc) => doc.data());
  //       console.log(productData);
  //       setData(productData);
  //     } else {
  //       // Product not found
  //       console.log('There is no document with this ID');
  //       setData(null); // Reset data if not found
  //     }
  //   });

  //   return () => unsubscribe(); // Clean up the subscription when the component unmounts
  // }, []);
  return <div>test test test</div>;
};
export default Test;
