import Wrapper from "../../UI/Wrapper";
import PasswordForm from "./PasswordForm";
import useUserAuthContext from "../../Hooks/firebase/useUserAuthContext";
import PageSpinner from "../../UI/PageSpinner";
import NameAndEmailForm from "./NameAndEmailForm";
import DeleteAccount from "./DeleteAccount";
import NotLoggedInPage from "../../pages/NotLoggedInPage";

const UserProfile = () => {
  const { user, userIsLoading, userDataIsLoading } = useUserAuthContext();

  if (userIsLoading || userDataIsLoading) return <PageSpinner />;

  if (!user || user.isAnonymous) return <NotLoggedInPage />;

  // Check if the user singed with google if true there will not be an update password option

  const isSingingWithGoogle =
    user?.providerData[0]?.providerId === "google.com";

  return (
    <section>
      <Wrapper className={"max-w-4xl p-4 pb-20"}>
        <div className="mt-14 rounded-lg border p-4 shadow-sm md:p-8 ">
          <h2 className="mb-8 text-xl font-medium">Profile Info </h2>
          <NameAndEmailForm />
        </div>
        {!isSingingWithGoogle && (
          <div className="mt-14 rounded-lg border p-4 shadow-sm md:p-8 ">
            <h2 className="mb-8 text-xl font-medium">Change Password </h2>
            <PasswordForm />
          </div>
        )}
        <div className="mt-14 rounded-lg border p-4 shadow-sm md:p-8 ">
          <h2 className="mb-8 text-xl font-medium">Delete Account </h2>

          <DeleteAccount />
        </div>
      </Wrapper>
    </section>
  );
};
export default UserProfile;
