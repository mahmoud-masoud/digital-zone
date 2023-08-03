const ProductQuickHighlights = ({ highlights }) => {
  return (
    <div className='w-full mb-4'>
      <h3 className='text-xl font-semibold mb-4'>Quick Highlights</h3>
      <div className='bg-gray-100 rounded-md p-4 '>
        <div>
          <p>{highlights}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductQuickHighlights;
