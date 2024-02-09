import { Plus, Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";
import InputError from "../../../UI/InputError";

const ProductHighlights = ({ control, fields, append, remove, errors }) => {
  return (
    <div className="w-full gap-4">
      <p className="mb-4 md:text-lg">Highlights</p>
      <div className="flex flex-col gap-4 rounded-md ">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-6 rounded-md bg-gray-100 p-2 max-sm:flex-col md:items-center"
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

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="mx-auto h-8 w-8 rounded-full bg-gray-400 text-2xl text-white"
                onClick={() => remove(index)}
              >
                &times;
              </button>
            </div>
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
        className="shadow-gray-400-400 active:shadow-white-400 mt-4 flex items-center 
        rounded bg-slate-800 p-2 px-4 font-medium text-white transition hover:opacity-80 active:scale-90"
        onClick={() => append()}
      >
        <Plus size={22} />
        Add
      </button>
    </div>
  );
};
export default ProductHighlights;
