import Wrapper from "../UI/Wrapper";
import AddToCartBox from "../components/Favorites/AddToCartBox";
import FavItems from "../components/Favorites/FavItems";

import EmptyFavorites from "../components/Favorites/EmptyFavorites";
import Loading from "../UI/Loading";
import useRealTimeSubColDocs from "../Hooks/firebase/useRealTimeSubColDocs";
import { auth } from "../Utils/firebase";
import useAuthState from "../Hooks/firebase/useAuthState";

const Favorites = () => {
  const { user, isLoading: userIsLoading, isError: userError } = useAuthState();

  const { data, loading, error } = useRealTimeSubColDocs("favorites");

  if (user?.isAnonymous) return <p>Login to save your items</p>;
  if (user && !data?.length) return <EmptyFavorites />;
  if (loading) return <Loading />;
  if (userIsLoading) return <Loading />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Wrapper className="flex flex-col items-start gap-8 md:flex-row ">
      <FavItems data={data} />
      <AddToCartBox data={data} />
    </Wrapper>
  );
};
export default Favorites;
