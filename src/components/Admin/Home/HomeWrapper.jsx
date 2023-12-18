import Wrapper from "../../../UI/Wrapper";
import Users from "./Users";
import Orders from "./Orders";
import Sales from "./Sales";
const Home = () => {
  return (
    <Wrapper className=" px-4 pb-20 pt-10 ">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-8 rounded-lg bg-white p-4 shadow-sm">
        <Users />
        <Orders />
        <Sales />
      </div>
    </Wrapper>
  );
};
export default Home;
