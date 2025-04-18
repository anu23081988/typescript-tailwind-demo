import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import Header from "../../../views/Header/Header";
import AddToCart from "../../../views/AddToCart/AddToCart";

const ProductDetail: React.FC = (props = {}) => {
  const { id: productId } = useParams<{ id: string }>();

  const [product, setProduct] = React.useState<Product>();
  const [productLoader, setProductLoader] = React.useState<boolean>(true);

  const {
    title,
    price,
    description,
    category,
    image,
    rating: { rate = 0 } = {},
  } = product || {};

  React.useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = (): void => {
    setProductLoader(true);
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setProductLoader(false);
      })
      .catch((err) => {
        console.log(`Error in fetchhing product with id ${productId}, ${err}`);
        setProductLoader(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Header
        sectionTitle="Product Detail"
        backLink="/"
        backLinkText="Back to products"
      />
      {!productLoader ? (
        <div className="flex flex-row p-4 bg-secondary-color">
          <img
            src={image}
            alt={title}
            className="w-1/3 h-48 object-scale-down mb-2"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">{`${category} - ${title}`}</h2>
            <hr className="h-1 bg-primary-color mb-2" />
            <p className="text-base float-right mb-2">{`Rating: ${rate}`}</p>
            <h3 className="font-bold">Product Details</h3>
            <p className="text-xl font-semibold mb-5">{`$${price}`}</p>
            <p className="text-base">{description}</p>
            <AddToCart productDetail={product} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductDetail;
