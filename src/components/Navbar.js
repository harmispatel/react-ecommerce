import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const cartCount = useSelector((state) => state.cart.cartItems);

  return (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/task-list"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/task-list")
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Task List
                </Link>

                <Link
                  to="/product"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive("/product")
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Products
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />

              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cartCount?.length}
              </span>
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            to="/task-list"
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              isActive("/task-list")
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Task List
          </Link>

          <Link
            to="/product"
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              isActive("/products")
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Products
          </Link>

          <DisclosureButton
            as="a"
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Logout
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
