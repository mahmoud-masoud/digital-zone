import { AlertCircle } from "lucide-react";

const InputError = ({ message }) => {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
      <AlertCircle size={20} />
      <p>{message}</p>
    </div>
  );
};
export default InputError;
