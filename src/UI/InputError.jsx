import { AlertCircle } from "lucide-react";

const InputError = ({ message }) => {
  return (
    <div className="mt-2 flex items-center gap-2 text-red-500">
      <AlertCircle />
      <p>{message}</p>
    </div>
  );
};
export default InputError;
