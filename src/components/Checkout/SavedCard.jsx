import { useState } from "react";

import { CreditCardIcon } from "@heroicons/react/24/solid";

const SavedCard = ({ cardLastDigits }) => {
  const [CVV, setCVV] = useState("");

  const CVVHandler = (e) => {
    const value = e.target.value;
    const isNumber = /^\d+$/.test(value);

    const isValid = isNumber && value.length < 4;

    if (isValid || value == "") {
      setCVV(value);
      return;
    }
  };

  return (
    <div className="pt-4">
      <h3 className="mb-4 font-semibold md:text-xl">Saved Card</h3>
      <div className="flex items-center gap-3 border-b pb-4">
        <CreditCardIcon className="w-9 text-primary" />
        <p>
          Ending in <span className="font-semibold">{cardLastDigits}</span>
        </p>
        <input
          type="password"
          value={CVV}
          onChange={CVVHandler}
          placeholder="CVV"
          className={`w-16 rounded-md  px-3 py-1.5 `}
        />
      </div>
    </div>
  );
};
export default SavedCard;
