import SignInCard from "../components/auth/SignIn/SignInCard";
import TopBar from "../components/auth/Topbar";

const Login = () => {
  return (
    <div>
      <TopBar title={"Sing in"} />
      <SignInCard />
    </div>
  );
};
export default Login;
