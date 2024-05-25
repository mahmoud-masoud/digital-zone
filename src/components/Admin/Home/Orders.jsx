import { useEffect, useState } from "react";
import { db } from "../../../Utils/firebaseConfig";
import { InboxStackIcon } from "@heroicons/react/24/solid";
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
        <InboxStackIcon className="h-7 w-7 fill-after" />
      </div>
      <p className="font-semibold">{ordersCount}</p>
    </div>
  );
};
export default Orders;
