import { useContext } from "react";
import { UserAuthContext } from "../../components/Context/UserAuthContext";

const useUserAuthContext = () => {
  const {
    user,
    isAdmin,
    userIsLoading,
    userDataIsLoading,
    updateUserInfoInDB,
  } = useContext(UserAuthContext);
  return {
    user,
    isAdmin,
    userIsLoading,
    userDataIsLoading,
    updateUserInfoInDB,
  };
};
export default useUserAuthContext;
