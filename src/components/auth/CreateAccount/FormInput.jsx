import InputError from "../../../UI/InputError";

const FormInput = ({
  label,
  name,
  placeholder,
  inputType,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-primary">
        <span>{label}</span>
      </label>
      <input
        type={inputType}
        id={name}
        name={name}
        placeholder={placeholder}
        {...register}
        className="rounded-lg border border-gray-400 p-3 transition-all
        duration-300 hover:border-primary"
      />
      {errors[name] && <InputError message={errors[name]?.message} />}
    </div>
  );
};
export default FormInput;
