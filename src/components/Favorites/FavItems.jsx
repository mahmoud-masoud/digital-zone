import FavItem from "./FavItem";

const FavItems = ({ data }) => {
  return (
    <section className="w-full flex-1 px-4 pb-20">
      <div className="bb-2 mb-4">
        <h1 className="text-2xl font-bold">Your Items</h1>
        <span className="block py-4">{data?.length} items</span>
      </div>
      <ul>
        {data?.map((item) => (
          <li key={item.id} className="bb-2 py-5 last:border-none">
            <FavItem
              title={item.title}
              image={item.image}
              price={item.price}
              id={item.id}
              fetchedNeededQuantity={item.neededQuantity}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default FavItems;
