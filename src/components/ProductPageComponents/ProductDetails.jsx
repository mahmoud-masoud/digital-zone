const ProductDetails = ({ description, features }) => {
  return (
    <div className="">
      <h3 className="mb-5 text-xl font-bold">About this item</h3>

      <div
        className="prose mb-3 max-w-none bg-white pl-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};
export default ProductDetails;
