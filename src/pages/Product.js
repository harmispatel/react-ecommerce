import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredProducts,
  clearFilteredProducts,
} from "../auth/productSlice";
import { fetchProducts } from "../app/productsDummy";
import { addToCart } from "../auth/cartSlice";
import toast from "react-hot-toast";

const Product = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { cartItems } = useSelector((state) => state.cart);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      dispatch(setFilteredProducts(e.target.value));
    } else {
      dispatch(clearFilteredProducts());
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const productsToDisplay = searchQuery ? filteredProducts : products;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border rounded-md"
          placeholder="Search products..."
        />
      </div>

      {productsToDisplay.length === 0 && searchQuery && (
        <p className="text-red-500">No products found matching your search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {productsToDisplay.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="mx-auto w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                className="h-48 w-full object-cover object-center"
                src={product.images[0]}
                alt="Product_Image"
              />
              <div className="p-4">
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 h-20">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <button
                    disabled={isInCart}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      isInCart
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isInCart ? "Added" : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
