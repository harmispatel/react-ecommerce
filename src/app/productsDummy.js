import { setLoading, setError, setProducts } from "../auth/productSlice";

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(setError("Failed to load products"));
  } finally {
    dispatch(setLoading(false));
  }
};
