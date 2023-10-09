const ProductTitle = ({ register }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        placeholder='iPhone 14 pro max'
        {...register}
        className='border border-black rounded-lg p-2'
      />
    </div>
  );
};
export default ProductTitle;
