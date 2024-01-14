import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "../../store/cartItems";
const AddToCartBtn = ({ title, price, id, image }) => {
  const [btnState, setBtnState] = useState({
    clicked: false,
    content: "Add to cart",
  });
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const itemQuantity = useSelector(
    (state) => state.cartItems.items.find((item) => item?.id === id)?.quantity,
  );

  useEffect(() => {
    if (itemQuantity) {
      setBtnState(() => {
        return { clicked: true, content: " added" };
      });
      setQuantity(itemQuantity);
    }
  }, [quantity]);

  const addToCartFirstTimeHandler = () => {
    setBtnState(() => {
      return { clicked: true, content: " added" };
    });
    setQuantity((prev) => prev + 1);
    dispatch(cartActions.addItem({ title, price, id, image }));
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({ title, price, id, image }));
    setQuantity((prev) => prev + 1);
  };

  const removeFromCart = () => {
    dispatch(cartActions.removeItem(id));
    setQuantity((prev) => prev - 1);
    if (quantity === 1) {
      setBtnState({ clicked: false, content: "Add to cart" });
    }
  };

  return (
    <div
      className={`bg-primary 
    ${btnState.clicked ? "w-40 p-1" : "w-fit hover:bg-after active:bg-after"}
    flex items-center justify-between  rounded-full text-white`}
    >
      {!btnState.clicked && (
        <button
          onClick={addToCartFirstTimeHandler}
          className="px-6 py-2 font-medium"
        >
          <span> {btnState.content} </span>
        </button>
      )}

      {btnState.clicked && (
        <>
          <button
            className="rounded-full p-2 hover:bg-medium"
            onClick={removeFromCart}
          >
            <MinusIcon />
          </button>
          <span className="flex-1 text-center font-medium">
            {quantity + btnState.content}{" "}
          </span>
          <button
            className="rounded-full p-2 hover:bg-medium"
            onClick={addToCart}
          >
            <PlusIcon />
          </button>
        </>
      )}
    </div>
  );
};
export default AddToCartBtn;
