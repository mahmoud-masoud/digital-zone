import AddToCartBtn from "../ProductPageComponents/ProductBuyBox/AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useState } from "react";
import { auth } from "../../Utils/firebase";
import {
  removeProductFromFavorites,
  updateNeededQuantity,
} from "../../Utils/firebase-functions";
import { useAuthState } from "react-firebase-hooks/auth";

const FavItem = ({ title, image, price, id, fetchedNeededQuantity }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);

  const selectedValueHandler = (e) => {
    const selectedNeededQuantity = +e.target.value;

    updateNeededQuantity(user.uid, id, selectedNeededQuantity);
  };

  const removeItem = () => {
    removeProductFromFavorites(user.uid, id);
  };

  return (
    <>
      <Link to={`/ip/${id}`}>
        <div className="mb-4 flex justify-between">
          <div className="flex justify-between gap-4 md:gap-6 lg:gap-10">
            <div className="flex w-24 shrink-0 items-center justify-center">
              <img
                src={image}
                alt={title}
                width="150"
                height="150"
                className="max-h-full max-w-full"
              />
            </div>
            <p className="line-clamp-2">{title}</p>
          </div>

          <span className="text-lg font-bold">{`$${price}`}</span>
        </div>
      </Link>

      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <button
            className="underline hover:text-primary hover:no-underline"
            onClick={removeItem}
          >
            Remove
          </button>
          <div>
            <label htmlFor="select">Need:</label>
            <select
              name="select"
              id="select"
              className="text-fontColor"
              onChange={selectedValueHandler}
              defaultValue={fetchedNeededQuantity ? fetchedNeededQuantity : 1}
            >
              {Array(10)
                .fill(null)
                .map((_, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {index + 1}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <AddToCartBtn title={title} id={id} image={image} price={price} />
      </div>
    </>
  );
};
export default FavItem;
