import { FaSackDollar } from "react-icons/fa6";
import { db } from "../../../Utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import formatePrice from "../../../Utils/formatePrice";
const Sales = () => {
  const [sales, setSales] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      const ordersColRef = collection(db, "orders");
      const snapshot = await getDocs(ordersColRef);

      const ordersTotalAmount = snapshot.docs.reduce((prev, curr) => {
        return (prev += curr.data().totalAmount);
      }, 0);

      const totalAmount = formatePrice(ordersTotalAmount);
      setSales(totalAmount);
    };
    getUsers();
  }, []);
  return (
    <div className=" flex-1 rounded-md bg-green-100 p-4 ">
      <div className="mb-4 flex gap-4">
        <span className="">Sales</span>
        <FaSackDollar className="text-2xl text-after" />
      </div>
      <p className="font-semibold">{sales}</p>
    </div>
  );
};
export default Sales;
