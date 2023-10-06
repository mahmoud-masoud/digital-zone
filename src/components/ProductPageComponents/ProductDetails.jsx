const ProductDetails = ({ description, features }) => {
  return (
    <div className=''>
      <h3 className='text-xl font-bold mb-5'>About this item</h3>
      <div className='bg-white text-gray-700 pl-4'>
        <p className='font-medium mb-3 text'>{description}</p>
        {features && (
          <ul className='list-disc pl-8'>
            {features.map((feature, index) => (
              <li key={index} className='py-1'>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ProductDetails;
