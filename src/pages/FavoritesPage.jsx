import Wrapper from "../UI/Wrapper";
import PageSpinner from "../UI/PageSpinner";
import AddToCartBox from "../components/Favorites/AddToCartBox";
import FavItems from "../components/Favorites/FavItems";
import EmptyFavorites from "../components/Favorites/EmptyFavorites";

import { auth } from "../Utils/firebase";
import useFavorites from "../Hooks/firebase/useFavorites";
import { useAuthState } from "react-firebase-hooks/auth";
import NotLoggedInPage from "../Pages/NotLoggedInPage";

const FavoritesPage = () => {
  const [user, { isLoading: userIsLoading, isError: userError }] =
    useAuthState(auth);

  const { data, loading, error } = useFavorites();

  if (loading || userIsLoading) return <PageSpinner />;
  if (user?.isAnonymous || !user) return <NotLoggedInPage />;
  if (user && !data?.length && !loading) return <EmptyFavorites />;
  if (error || userError) return <p>Something went wrong</p>;

  return (
    <Wrapper className="flex flex-col items-start gap-8 py-6 md:flex-row">
      <FavItems data={data} />
      <AddToCartBox data={data} />
    </Wrapper>
  );
};
export default FavoritesPage;
