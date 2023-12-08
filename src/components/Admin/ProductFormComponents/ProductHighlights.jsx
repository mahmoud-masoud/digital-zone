import { Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";
import InputError from "../../../UI/InputError";

const ProductHighlights = ({ control, fields, append, remove, errors }) => {
  return (
    <div className="w-full gap-4">
      <label>
        <span className="mb-4 block">Highlights</span>
      </label>
      <div className="flex flex-col gap-4 rounded-md ">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-6 rounded-md p-2 "
          >
            <div className="flex flex-1 flex-col gap-6 md:flex-row">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="name">
                  <span className="text-sm">Name</span>
                </label>
                <Controller
                  defaultValue={""}
                  control={control}
                  name={`highlights.${index}.key`}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="key"
                      placeholder="highlight name"
                      {...field}
                      className="rounded-md border border-black p-2"
                    />
                  )}
                />
                {errors.highlights && errors.highlights[index]?.key && (
                  <InputError message={errors.highlights[index].key.message} />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="value">
                  <span className="text-sm">Value</span>
                </label>
                <Controller
                  defaultValue={""}
                  control={control}
                  name={`highlights.${index}.value`}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="value"
                      placeholder="highlight value"
                      {...field}
                      className=" rounded-md  border  border-black p-2"
                    />
                  )}
                />

                {errors.highlights && errors.highlights[index]?.value && (
                  <InputError
                    message={errors.highlights[index].value.message}
                  />
                )}
              </div>
            </div>

            <button type="button" onClick={() => remove(index)}>
              <Trash2 size={20} className="text-gray-500" />
            </button>
          </div>
        ))}

        {(errors.highlights?.message || errors.highlights?.root?.message) && (
          <InputError
            message={
              errors.highlights.message || errors.highlights.root.message
            }
          />
        )}
      </div>

      <button
        type="button"
        className="shadow-gray-400-400 active:shadow-white-400 mt-4 rounded-lg bg-black
     px-6 py-1.5 font-medium text-white 
 shadow-gray-500 transition hover:bg-gray-800 active:scale-90 active:shadow-inner
  active:shadow-gray-400"
        onClick={() => append()}
      >
        Add
      </button>
    </div>
  );
};
export default ProductHighlights;
