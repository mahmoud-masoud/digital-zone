const NewProductPrice = ({ register }) => {
  return (
    <div className='flex flex-col gap-2 w-32'>
      <label htmlFor='price'>Price</label>
      <input
        type='text'
        id='price'
        placeholder='$0.00'
        className='border border-black rounded-md p-1.5'
        {...register}
      />
    </div>
  );
};
export default NewProductPrice;
