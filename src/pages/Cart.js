import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../auth/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (product) => {
    toast.success("Deleted successfully");
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleChangeQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const getTotalPrice = () => {
    return cart?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>

      {cart?.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                Shopping Cart
              </h2>
              <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-xl leading-8 text-gray-500">
                  Product
                </div>
                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                  <span className="w-full max-w-[200px] text-center">
                    Price
                  </span>
                  <span className="w-full max-w-[260px] text-center">
                    Quantity
                  </span>
                  <span className="w-full max-w-[200px] text-center">
                    Total
                  </span>
                </p>
              </div>

              {cart?.map((product) => (
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
                  key={product.id}
                >
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box">
                      <img
                        src={product.images[0]}
                        alt="product_image"
                        className="xl:w-[140px] rounded-xl object-cover"
                      />
                    </div>
                    <div className="pro-data w-full max-w-sm relative">
                      <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                        {product.title}
                      </h5>
                      <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                        {product.category.name}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from cart"
                      >
                        <FaTrashAlt className="text-red-500 hover:text-red-700 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                      ${product.price}
                    </h6>
                    <div className="flex items-center w-full mx-auto justify-center">
                      <button
                        className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        onClick={() =>
                          handleChangeQuantity(product.id, product.quantity - 1)
                        }
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                        value={product.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        onClick={() =>
                          handleChangeQuantity(product.id, product.quantity + 1)
                        }
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                      ${(product.price * product.quantity)?.toFixed(2)}
                    </h6>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-400">
                    Sub Total
                  </p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">
                    ${getTotalPrice()?.toFixed(2)}
                  </h6>
                </div>

                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                    ${getTotalPrice()?.toFixed(2)}
                  </h6>
                </div>
              </div>
              <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                  onClick={handleClearCart}
                  class="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100"
                >
                  <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">
                    Clear Cart
                  </span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Cart;
