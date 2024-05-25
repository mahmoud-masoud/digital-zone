const ProductDetails = ({ description }) => {
  return (
    <div className="max-sm:mb-16">
      <h3 className="mb-5 text-xl font-bold">About this item</h3>

      <article
        className="prose mb-3 max-w-none bg-white pl-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      ></article>
    </div>
  );
};
export default ProductDetails;
