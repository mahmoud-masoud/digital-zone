import { useEffect, useState } from "react";
import { FaBoxesStacked } from "react-icons/fa6";
import { db } from "../../../Utils/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
const Orders = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      const ordersColRef = collection(db, "orders");
      const snapshot = await getCountFromServer(ordersColRef);
      setOrdersCount(snapshot.data().count);
    };
    getUsers();
  }, []);
  return (
    <div className="flex-1 rounded-md bg-light p-4">
      <div className="mb-4 flex gap-4">
        <span className="">Total Orders</span>
        <FaBoxesStacked className="text-2xl text-after" />
      </div>
      <p className="font-semibold">{ordersCount}</p>
    </div>
  );
};
export default Orders;
