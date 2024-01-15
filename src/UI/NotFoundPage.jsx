import Lottie from "lottie-react";
import Wrapper from "./Wrapper";
import NotFoundAnimation from "../Assets/Lottie/not-found-page.json";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="">
      <Wrapper className={"flex flex-col items-center justify-center"}>
        <div className="max-w-lg p-4 pt-32 md:pt-10">
          <Lottie animationData={NotFoundAnimation} />
        </div>
        <div className="max-w-lg pt-10  text-center">
          <h1 className=" text-2xl font-semibold text-fontColor">
            Page Not Found!
          </h1>
          <p className="pt-6">
            Oops! It seems like the page you are looking for has wandered off
            somewhere.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-lg  bg-blue-500 px-6 py-2
       text-lg font-bold text-white duration-150 hover:bg-blue-600 "
        >
          Back to home
        </button>
      </Wrapper>
    </section>
  );
};
export default NotFoundPage;
