import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import Header from "../../../views/Header/Header";
import AddToCart from "../../../views/AddToCart/AddToCart";

const ProductList: React.FC = () => {
  const [productLoader, setProductLoader] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (): void => {
    setProductLoader(true);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setProductLoader(false);
      })
      .catch((err) => {
        console.log(`error in fetching products ${err}`);
        setProductLoader(false);
      });
  };

  const renderProductCard = (productData: Product): JSX.Element => {
    const { id, image, title, price } = productData;

    return (
      <div className="flex flex-col shadow hover:shadow-lg p-4 border rounded w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div>
          <AddToCart
            isRedirectedFromListing={true}
            productDetail={productData}
          />
        </div>

        <Link to={`/product/${id}`} key={id} className="flex flex-col">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-scale-down mb-2"
          />
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <div>
            <p className="text-xl font-semibold">${price}</p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Header sectionTitle="Product List" />
      {!productLoader ? <div className="flex flex-wrap gap-4">
        {products.map((data, index) => renderProductCard(data))}
      </div> :  <div>Loading...</div>}
    </div>
  );
};

export default ProductList;
