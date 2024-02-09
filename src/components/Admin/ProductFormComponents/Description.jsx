import { Controller } from "react-hook-form";
import Tiptap from "../Editor/Tiptap";
import InputError from "../../../UI/InputError";

const Description = ({ errors, control, description }) => {
  return (
    <div>
      <label htmlFor="description" className="mb-4 inline-flex md:text-lg">
        Description
      </label>
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
