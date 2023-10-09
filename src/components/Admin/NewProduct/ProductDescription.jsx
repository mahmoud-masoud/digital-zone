const ProductDescription = ({ register }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        id='description'
        placeholder='Product Description'
        className='border border-black rounded-lg p-2 min-h-[150px]'
        {...register}
      ></textarea>
    </div>
  );
};
export default ProductDescription;
