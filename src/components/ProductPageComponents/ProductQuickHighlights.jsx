const ProductQuickHighlights = ({ highlights }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-4 text-xl font-semibold">Quick Highlights</h3>
      <div className="rounded-lg bg-gray-100">
        <ul className="flex flex-col flex-wrap p-5 md:flex-row">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex gap-2 border-gray-300 py-1 text-sm text-gray-800 md:w-1/2 md:odd:border-r md:even:pl-5"
            >
              <div className="flex w-2/3 font-medium ">{highlight.key}</div>
              <div className="flex pr-2">{highlight.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProductQuickHighlights;
