import React from "react";
import { Product } from "../products/types";
import { useCart } from "../../views/CartContext/CartContext";

interface CardProp {
  count: number;
  productDetail: Product;
  productId: number;
}

const ProductCard: React.FC<CardProp> = ({
  count,
  productDetail,
  productId,
}) => {
  const { deleteCartItem } = useCart();

  const { title = "", price = 0, category = "", image = "" } = productDetail;

  return (
    <div
      className="flex flex-row w-full p-4 border-b border-primary-color items-stretch"
      key={productId}
    >
      <img
        id="img"
        src={image}
        alt={`${category} - ${title}`}
        className="w-1/4 h-100 object-scale-down"
        style={{ maxHeight: "100px" }}
      />
      <div className="flex-1 p-2" id="divDesc">
        <p className="font-semibold text-lg">{`${category} - ${title}`}</p>
        <p className="text-gray-700">{`$${price.toFixed(2)}`}</p>
        <div className="mt-2 flex items-center">
          <input
            type="number"
            value={count}
            readOnly
            className="w-16 text-center border rounded"
          />
          <button
            className="ml-4 text-red-600 hover:underline"
            onClick={() => deleteCartItem(productId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
