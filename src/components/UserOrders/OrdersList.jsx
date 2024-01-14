import { useEffect, useState } from "react";
import Wrapper from "../../UI/Wrapper";
import MainSpinner from "../../UI/MainSpinner";
import NotLoggedIn from "../../UI/NotLoggedIn";
import Order from "./Order";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../Utils/firebase";
import EmptyOrders from "./EmptyOrders";
const OrdersList = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, { isLoading: userIsLoading, isError: userError }] =
    useAuthState(auth);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        if (user && !user.isAnonymous) {
          setIsLoading(true);
          const ordersCol = collection(db, "orders");

          const q = query(
            ordersCol,
            where("userId", "==", user.uid),
            orderBy("timestamp", "desc"),
          );

          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const ordersData = snapshot.docs.map((order) => order.data());
            setOrders(ordersData);
          }
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    };

    getUserOrders();
  }, [user]);

  if (isLoading || userIsLoading) return <MainSpinner />;
  if (userError || isError) return <p>Something went wrong!</p>;
  if (!user || user.isAnonymous) return <NotLoggedIn />;
  if (user && !user.isAnonymous && !orders) return <EmptyOrders />;

  return (
    <section className="min-h-screen bg-slate-100">
      <Wrapper className="p-2 py-10">
        <h1 className="mb-4 text-2xl font-semibold">Orders</h1>
        <div className="flex max-w-4xl flex-col gap-8">
          {orders.map((order) => (
            <div key={order.id}>
              <Order order={order} />
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
export default OrdersList;
