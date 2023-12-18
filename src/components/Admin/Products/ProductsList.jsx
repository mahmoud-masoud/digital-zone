import {
  getDocs,
  query,
  collectionGroup,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import Product from "./Product";
import { useEffect, useState } from "react";
import { db } from "../../../Utils/firebase";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collectionGroup(db, "products");
    const q = query(productsRef, orderBy("timestamp", "desc"));

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const allProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts(allProducts);
    });

    return unSubscribe;
  }, []);

  console.log(products);

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-xl bg-white">
      <ul>
        {products.map((product, index) => (
          <li key={index} className="border-b last:border-none">
            <Link to={product.id}>
              <Product title={product.title} img={product.images[0]} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductsList;
