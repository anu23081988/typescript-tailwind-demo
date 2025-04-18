import React from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../Icons/cartSvg";

import { useCart } from "../CartContext/CartContext";

interface HeaderProps {
  sectionTitle: string;
  backLink?: string;
  backLinkText?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { backLink, sectionTitle, backLinkText } = props || {};
  const { cartCount } = useCart();

  return (
    <div className="flex flex-row justify-between w-full bg-header-gradient h-[100px]  mb-10">
      <div className="flex flex-col">
        {backLink && (
          <Link to={backLink} className="pl-2 pt-2 text-white hover:text-black">
            {`<< ${backLinkText}` || "<< Back"}
          </Link>
        )}
        <h1 className="text-3xl font-light text-white text-center items-center flex h-full pl-2">
          {sectionTitle}
        </h1>
      </div>
      <Link to="/cart" className="text-white pr-2 pt-2 relative">
      <CartIcon/>
      
        {cartCount > 0 && (
            <>
            <span className="absolute top-[20%] right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartCount}
            </span>
          </>
        )}
      </Link>
    </div>
  );
};

export default Header;
