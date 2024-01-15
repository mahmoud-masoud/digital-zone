import { useEffect, useState } from "react";
import Table from "../Shared/Table";
import productsColumns from "./ProductsColumns";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../Utils/firebase";
import MainSpinner from "../../../UI/MainSpinner";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const productsRef = collectionGroup(db, "products");
    const q = query(productsRef);

    try {
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        const allProducts = querySnapshot.docs.map((doc) => doc.data());
        setProducts(allProducts);
        setLoading(false);
      });

      return unSubscribe;
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  }, []);

  if (loading) return <MainSpinner />;
  if (error) return <p>Something went wrong reload the page</p>;

  return (
    <Table
      data={products}
      setData={setProducts}
      tableColumns={productsColumns}
    />
  );
};
export default ProductsTable;
