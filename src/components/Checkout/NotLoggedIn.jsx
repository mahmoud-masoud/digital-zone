import { Link, useNavigate } from "react-router-dom";
import Logo from "../../UI/Logo";
import Wrapper from "../../UI/Wrapper";

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen ">
      <nav className="sticky top-0 z-10 w-full bg-primary p-4 shadow-lg">
        <div className="mx-auto flex h-full w-[800px] max-w-full items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Checkout
          </h2>
        </div>
      </nav>
      <Wrapper>
        <div className="flex flex-col items-center p-2 pb-10">
          <div className="max-w-[500px] ">
            <img
              src="images/illustration/login.webp"
              alt="person trying to login"
              className="max-w-full"
            />
          </div>
          <h1 className="mt-10  text-center font-bold text-dark md:text-xl">
            You are not logged in sign in or create an account.{" "}
          </h1>

          <div className="mt-10 flex items-center gap-10">
            <button
              onClick={() => navigate("/signup")}
              className=" w-fit rounded-md bg-primary p-2 px-8
               font-semibold text-white duration-150 hover:bg-after"
            >
              Sign up
            </button>
            <button
              onClick={() => navigate("/signin")}
              className=" w-fit rounded-md border border-gray-400 px-8
               py-2 font-semibold duration-150 hover:bg-light"
            >
              Sign in
            </button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
export default NotLoggedIn;
