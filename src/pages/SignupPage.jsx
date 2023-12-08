import SignupComponents from "../components/auth/CreateAccount/SignupComponents";
import TopBar from "../components/auth/Topbar";

const SignUp = () => {
  return (
    <div>
      <TopBar title={"Sign up"} />
      <SignupComponents />
    </div>
  );
};
export default SignUp;
