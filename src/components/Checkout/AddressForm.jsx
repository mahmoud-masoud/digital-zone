import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { shippingInfo } from "../../Utils/zod";
import { userShippingInfoActions } from "../../store/userShippingInfo";
import { useDispatch } from "react-redux";
import { auth, db } from "../../Utils/firebase";
import { doc, runTransaction } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Label from "../../UI/Label";
import Input from "../../UI/Input";
import InputError from "../../UI/InputError";
import LightSpinner from "../../UI/LightSpinner";
const AddressForm = ({ userShippingInfo, setFormVisibility }) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: userShippingInfo,
    resolver: zodResolver(shippingInfo),
  });

  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await runTransaction(db, async (transaction) => {
        transaction.update(userRef, {
          shippingInfo: data,
        });
      });
      setFormVisibility(false);
    } catch (error) {
      console.log(error);
    }
    dispatch(userShippingInfoActions.addUserShippingInfo(data));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 flex-col">
              <Label htmlFor={"firstName"}>First Name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="First name"
                className="max-w-full"
                register={register("firstName")}
              />
              {errors.firstName && (
                <InputError message={errors.firstName.message} />
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <Label htmlFor={"lastName"}>Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                className="max-w-full"
                register={register("lastName")}
              />
              {errors.lastName && (
                <InputError message={errors.lastName.message} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 flex-col">
              <Label htmlFor={"address"}>Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Address"
                className="max-w-full"
                register={register("address")}
              />
              {errors.address && (
                <InputError message={errors.address.message} />
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <Label htmlFor={"phoneNumber"}>Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="0123456789"
                className="max-w-full"
                register={register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <InputError message={errors.phoneNumber.message} />
              )}
            </div>
          </div>
          <div>
            <div className="flex w-full flex-1 flex-col">
              <Label htmlFor={"deliveryNotes"}>Delivery notes</Label>
              <textarea
                id="deliveryNotes"
                type="text"
                defaultValue={""}
                {...register("deliveryNotes")}
                placeholder="Enter any notes here"
                className="h-32 max-w-full resize-none rounded-md
        border border-slate-400 p-3 outline-0 duration-300  hover:border-slate-600 focus:shadow-input"
              />
              {errors.deliveryNotes && (
                <InputError message={errors.deliveryNotes.message} />
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-8">
          {userShippingInfo && (
            <button
              type="button"
              onClick={() => setFormVisibility(false)}
              className=" rounded-full border
            border-gray-600 px-4 py-2 hover:border-black"
            >
              Cancel
            </button>
          )}
          <button
            className="flex w-24 items-center
             justify-center rounded-full border border-primary  bg-primary p-2
        text-white transition duration-150 hover:bg-after"
          >
            {isSubmitting ? <LightSpinner h={7} w={7} /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddressForm;
