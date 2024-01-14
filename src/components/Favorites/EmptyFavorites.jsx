import HeartPlusIcon from "../../Assets/HeartPlusIcon";
const EmptyFavorites = () => {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-10">
      <HeartPlusIcon className={"h-36 w-36 stroke-1 text-after"} />
      <h1 className="text-2xl font-bold text-dark">No Favorite Items</h1>
    </div>
  );
};
export default EmptyFavorites;
