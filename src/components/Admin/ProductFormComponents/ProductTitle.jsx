import { Controller } from "react-hook-form";
import InputError from "../../../UI/InputError";
const ProductTitle = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title">Title</label>
      <Controller
        name="title"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <input
            type="text"
            id="title"
            placeholder="iPhone 14 pro max"
            {...field}
            className="rounded-lg border border-black p-2"
          />
        )}
      />
      {errors && errors.title && <InputError message={errors.title.message} />}
    </div>
  );
};
export default ProductTitle;
