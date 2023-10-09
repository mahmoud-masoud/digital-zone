const ProductCategory = ({ register }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='category' className='mr-2'>
        Category
      </label>
      <select
        name='category'
        id='category'
        defaultValue={'laptops'}
        {...register}
        className='border border-black p-1'
      >
        <option value='laptops'>Laptops</option>
        <option value='headphones'>Headphones</option>
        <option value='smart-watches'>Smart Watches</option>
        <option value='mobile-phones'>Mobile Phones</option>
        <option value='gaming'>Gaming</option>
      </select>
    </div>
  );
};
export default ProductCategory;
