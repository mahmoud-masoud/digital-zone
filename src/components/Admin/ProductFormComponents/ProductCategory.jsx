import InputError from "../../../UI/InputError";

const ProductCategory = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="mr-2">
        Category
      </label>
      <select
        name="category"
        id="category"
        {...register}
        defaultValue={"laptops"}
        className="border border-black p-1"
      >
        <option value="laptops">Laptops</option>
        <option value="headphones">Headphones</option>
        <option value="smart-watches">Smart Watches</option>
        <option value="mobile-phones">Mobile Phones</option>
        <option value="gaming">Gaming</option>
      </select>

      {errors && errors.category && (
        <InputError message={errors.category.message} />
      )}
    </div>
  );
};
export default ProductCategory;
