import React from "react";
import { useCart } from "../CartContext/CartContext";
import { Product } from "../../containers/products/types";
import { CartIcon } from "../Icons/cartSvg";

// Define the CartProp interface
interface CartProp {
  isRedirectedFromListing?: boolean;
  productDetail?: Product; // Make optional
}

const AddToCart: React.FC<CartProp> = ({ isRedirectedFromListing = false, productDetail }) => {
  const { addToCart } = useCart();

  const [itemCounter, setItemCounter] = React.useState<number>(0);
  const [errorToCart, setErrorToCart] = React.useState<boolean>(false);


  // Handle increasing the item counter
  const increaseItemCounter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setItemCounter(prevCounter => prevCounter + 1);
  };

  // Handle decreasing the item counter
  const decreaseItemCounter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setItemCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : prevCounter));
  };

  // Handle adding item to cart
  const handleAddCartClick = (event: React.MouseEvent<HTMLElement | SVGElement>): void => {
    event.preventDefault();
    if (productDetail && !isRedirectedFromListing && itemCounter > 0) {
      addToCart(productDetail.id, productDetail, itemCounter);
    } else if (productDetail && isRedirectedFromListing) {
      addToCart(productDetail.id, productDetail);
    } else {
      setErrorToCart(true);
    }
  };

  // Handle quantity input changes
  const handleOnQuantityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setItemCounter(value);
      setErrorToCart(false); // Reset error when a valid number is entered
    }
  };

  // Conditionally render based on `isRedirectedFromListing`
  return isRedirectedFromListing ? (
    <CartIcon classes="text-primary-color hover:text-black cursor-pointer" handleClick={handleAddCartClick}/>
  ) : (
    <>
      <div className="flex flex-row w-1/4 my-5">
        <button
          className="w-8 mr-2 border-2 border-primary-color bg-primary-color text-white hover:bg-secondary-color hover:text-black"
          onClick={increaseItemCounter}
        >
          +
        </button>
        <input
          className="w-10 text-end border-primary-color"
          type="number"
          value={itemCounter}
          onChange={handleOnQuantityChange}
        />
        <button
          className="w-8 ml-2 border-2 border-primary-color bg-primary-color text-white hover:bg-secondary-color hover:text-black"
          onClick={decreaseItemCounter}
        >
          -
        </button>
      </div>
      {errorToCart && (
        <span className="text-[#8B0000] mb-5">
          Please add quantity to add item to cart
        </span>
      )}
      <button
        className="w-1/4 p-4 border-2 border-primary-color bg-primary-color text-white hover:bg-secondary-color hover:text-black"
        onClick={handleAddCartClick}
      >
        ADD TO CART
      </button>
    </>
  );
};

export default AddToCart;
