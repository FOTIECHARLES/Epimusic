import React from "react";

const CartButton = ({ text, handleClick }) => {
  return (
    <button
      className="mt-4 p-2 bg-rose-600 text-white rounded flex items-center justify-center w-full text-2xl"
      onClick={handleClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default CartButton;