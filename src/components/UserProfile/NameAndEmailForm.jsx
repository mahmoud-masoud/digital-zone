import { useForm } from "react-hook-form";
import { updateEmail, updateProfile } from "firebase/auth";
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import LightSpinner from "../../UI/LightSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileInfoSchema } from "../../Utils/zod";
import InputError from "../../UI/InputError";
import useUserAuthContext from "../../Hooks/firebase/useUserAuthContext";

const NameAndEmailForm = () => {
  const { user, updateUserInfoInDB } = useUserAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, defaultValues },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email,
      username: user?.displayName,
    },
    resolver: zodResolver(updateProfileInfoSchema),
  });

  const newEmail = watch("email");
  const newName = watch("username");

  const onSubmit = async ({ email, username }) => {
    try {
      await updateEmail(user, email);
      await updateProfile(user, { displayName: username });
      updateUserInfoInDB(username, email);
      reset({ email: newEmail, username: newName });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          <Label className="text-sm">Email</Label>
          <Input
            type="email"
            name="email"
            register={register("email")}
            className={"max-w-md rounded"}
          />
          {errors.email && <InputError message={errors.email?.message} />}
        </div>

        <div className="flex-1">
          <Label className="text-sm">Your Name</Label>
          <Input
            name="username"
            className={"max-w-md rounded"}
            register={register("username")}
          />
          {errors.username && <InputError message={errors.username?.message} />}
        </div>
      </div>

      <button
        disabled={
          isSubmitting ||
          (defaultValues.email === newEmail &&
            defaultValues.username === newName)
        }
        className={`mt-6 rounded bg-primary px-4 py-2 text-white duration-150
   hover:bg-after disabled:cursor-not-allowed disabled:bg-primary/50`}
      >
        {isSubmitting ? <LightSpinner /> : "Update"}
      </button>
    </form>
  );
};
export default NameAndEmailForm;
