import { Controller } from "react-hook-form";
import Tiptap from "../Editor/Tiptap";
import InputError from "../../../UI/InputError";

const Description = ({ errors, control, description }) => {
  return (
    <div>
      <div className="mb-4 text-lg">
        <label htmlFor="description">Description</label>
      </div>
      <Controller
        name="description"
        defaultValue={description}
        control={control}
        render={({ field }) => (
          <Tiptap description={field.value} onChange={field.onChange} />
        )}
      />
      {errors?.description && (
        <InputError message={errors.description.message} />
      )}
    </div>
  );
};
export default Description;
