import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../../UI/Input";
import PasswordInput from "../../../../UI/PasswordInput";
import Label from "../../../../UI/Label";
import LightSpinner from "../../../../UI/LightSpinner";
import UsersTypeSelect from "./UsersTypeSelect";
import useCreateNewUser from "../../../../Hooks/firebase/useCreateNewUser";
import { createUserValidationSchema } from "../../../../Utils/zod";
import InputError from "../../../../UI/InputError";
import Toast from "../../../../UI/Toast";

const NewUserForm = () => {
  const { onSubmit, isError } = useCreateNewUser();

  console.log(isError);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(createUserValidationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="flex gap-5 max-lg:flex-col lg:gap-10">
        <div className="flex max-w-md flex-1 flex-col gap-5">
          <div>
            <Label className="text-sm">User Name</Label>
            <Input
              name="username"
              placeholder="username"
              register={register("username")}
            />
            {errors.username && (
              <InputError message={errors.username?.message} />
            )}
          </div>
          <div>
            <Label className="text-sm">User Email</Label>
            <Input
              name="email"
              placeholder="email"
              type="email"
              register={register("email")}
            />
            {errors.email && <InputError message={errors.email?.message} />}
          </div>
          <div>
            <Label className="text-sm">User Password</Label>
            <PasswordInput
              autoComplete="new-password"
              placeholder="password"
              register={register("password")}
            />
            {errors.password && (
              <InputError message={errors.password?.message} />
            )}
          </div>
          <div>
            <Label className="text-sm">User Address</Label>
            <Input
              name="address"
              placeholder="address"
              register={register("address")}
              className={"h-16"}
            />
          </div>
        </div>
        <div className="w-full max-lg:order-first lg:w-72">
          <Label className="text-sm">User Type</Label>
          <Controller
            name="type"
            defaultValue={"Regular"}
            control={control}
            render={({ field }) => (
              <UsersTypeSelect value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <button
        className="mt-10 w-full  max-w-md bg-primary px-4 py-2 font-medium
         text-white duration-150 hover:bg-after"
      >
        {isSubmitting ? <LightSpinner /> : "Create New User"}
      </button>

      {isSubmitSuccessful && <Toast>User Created Successfully</Toast>}
    </form>
  );
};
export default NewUserForm;
