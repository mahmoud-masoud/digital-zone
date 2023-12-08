import InputError from "../../../UI/InputError";

const ProductPrice = ({ register, errors }) => {
  return (
    <div>
      <div className="flex w-32 flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="$0.00"
          className="rounded-md border border-black p-1.5"
          {...register}
        />
      </div>
      {errors && errors.price && <InputError message={errors.price.message} />}
    </div>
  );
};
export default ProductPrice;
