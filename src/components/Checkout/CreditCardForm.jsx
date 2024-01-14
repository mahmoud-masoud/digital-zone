import { zodResolver } from "@hookform/resolvers/zod";
import { creditCardFormSchema } from "../../Utils/zod";
import { useForm } from "react-hook-form";
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import InputError from "../../UI/InputError";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userShippingInfoActions } from "../../store/userShippingInfo";
import { auth, db } from "../../Utils/firebase";
import { doc, runTransaction } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import LoadingSpinner from "../../UI/LoadingSpinner";

const CreditCardFrom = ({ setFormVisibility, userCreditCard }) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [saveCard, setSaveCard] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(creditCardFormSchema) });

  // save credit card info to db
  const onSubmit = async (data) => {
    if (saveCard)
      try {
        const userRef = doc(db, "users", user.uid);
        await runTransaction(db, async (transaction) => {
          transaction.update(userRef, {
            creditCard: data,
          });
          console.log("update user credit card");
        });
      } catch (error) {
        console.log(error);
      }

    dispatch(userShippingInfoActions.addUserCreditCard(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-6">
            <Label>Card number</Label>
            <div className="relative flex max-w-md">
              <span className="pointer-events-none absolute left-4  top-1/2 -translate-y-1/2">
                <CreditCardIcon className=" h-7 w-7 text-slate-500" />
              </span>
              <input
                inputMode="numeric"
                id="cc-number"
                pattern="\d*"
                autoComplete="cc-number"
                {...register("cc-number")}
                placeholder="0000 0000 0000 0000"
                maxLength={16}
                className="flex w-full appearance-none rounded-sm border
              border-slate-400 p-4 pl-14 leading-6
               outline-0 duration-150 hover:border-slate-600 
               focus:shadow-input"
              />
            </div>
            {errors["cc-number"] && (
              <InputError message={errors["cc-number"].message} />
            )}
          </div>

          <div className="flex gap-4">
            <div>
              <Label htmlFor={"cc-exp-moth"}>MM</Label>

              <select
                name="cc-exp-month"
                id="cc-exp-month"
                autoComplete="cc-exp-month"
                {...register("cc-exp-month", { valueAsNumber: true })}
                className="w-24 appearance-none rounded-sm
                 border border-slate-400 p-2
                  outline-0 duration-150 hover:border-slate-600 focus:shadow-input"
              >
                <option value="MM">MM</option>
                {Array(12)
                  .fill(null)
                  .map((_, index) => {
                    index++;
                    const value = index < 10 ? "0" + index : index;

                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
              </select>
              {errors["cc-exp-month"] && (
                <InputError message={errors["cc-exp-month"].message} />
              )}
            </div>

            <div>
              <Label htmlFor={"cc-exp-year"}>YY</Label>
              <select
                name="cc-exp-year"
                id="cc-exp-year"
                autoComplete="cc-exp-year"
                {...register("cc-exp-year", { valueAsNumber: true })}
                className="w-24 appearance-none gap-4 rounded-sm border
                border-slate-400 p-2
                  outline-0 duration-150 hover:border-slate-600 focus:shadow-input "
              >
                <option value="YY">YY</option>

                {Array(10)
                  .fill(null)
                  .map((_, index) => {
                    const year = new Date().getFullYear() + index;

                    return (
                      <option key={index} value={year} className="">
                        {year}
                      </option>
                    );
                  })}
              </select>
              {errors["cc-exp-year"] && (
                <InputError message={errors["cc-exp-year"].message} />
              )}
            </div>

            <div>
              <Label>CVV</Label>

              <Input
                type="password"
                inputMode="numeric"
                className={"w-28 rounded-sm p-2"}
                register={register("cvv")}
              />

              {errors["cvv"] && <InputError message={errors["cvv"].message} />}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              value={saveCard}
              onChange={() => {
                setSaveCard(!saveCard);
              }}
              className="text-primary"
            />
            <span className="text-sm font-bold">Remember this card</span>
          </div>

          <div className="mt-6 flex items-center gap-8">
            <button
              className="w-24 rounded-full bg-primary p-2 font-semibold
           text-white duration-150  hover:bg-after "
            >
              {isSubmitting ? <LoadingSpinner h={7} w={7} /> : "Save"}
            </button>
            {userCreditCard && (
              <button
                type="button"
                onClick={() => setFormVisibility(false)}
                className=" rounded-full border
            border-gray-600 px-4 py-2 hover:border-black"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreditCardFrom;
