import { auth } from "../../../Utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import LightSpinner from "../../../UI/LightSpinner";
import { Link } from "react-router-dom";

const MobileAccountAvatar = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <LightSpinner />;
  return (
    <div className="mb-6">
      {user && !user.isAnonymous && (
        <h2 className="text-xl font-medium">hi, {user.displayName}</h2>
      )}

      {user && user.isAnonymous && !loading && (
        <Link to={"signup"}>
          <div className="w-fit rounded-full bg-primary p-2 px-5 text-sm font-semibold text-white">
            Sign in or create account
          </div>
        </Link>
      )}
    </div>
  );
};
export default MobileAccountAvatar;
