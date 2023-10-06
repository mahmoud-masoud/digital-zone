const ProductQuickHighlights = ({ highlights }) => {
  console.log(highlights);
  return (
    <div className='w-full mb-4'>
      <h3 className='text-xl font-semibold mb-4'>Quick Highlights</h3>
      <div className='bg-gray-100 rounded-lg'>
        <ul className='flex flex-col md:flex-row flex-wrap p-5'>
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className='flex gap-2 md:w-1/2 text-sm py-1 text-gray-800 md:even:pl-5 md:odd:border-r border-gray-300'
            >
              <div className='flex font-medium w-2/3 '>{highlight.key}</div>
              <div className='flex pr-2'>{highlight.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProductQuickHighlights;
