import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";
import { logout } from "./userSlice";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productsList: null,
  },
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
  },
});
export default productSlice.reducer;
const { setProductsList } = productSlice.actions;

// --------------------------------------------------------------------------------
export const getAllProducts = (token) => {
  return async (dispatch) => {
    await axios
      .put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-products`, {
        header: token,
      })
      .then(async (res) => {
        dispatch(setProductsList(res.data.products));
      })
      .catch(() => {
        toast.error("Expired Sesion", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        logout();
      });
  };
};

export const getProductById = async (id, token) => {
  let product = null;
  await axios
    .put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-product-id/${id}`, {
      header: token,
    })
    .then(async (res) => {
      product = res.data.product;
    })
    .catch(() => {
      product = [];
    });
  return product;
};

export const getProductByName = (name, token) => {
  return async (dispatch) => {
    await axios
      .put(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/get-product-name/${name}`,
        {
          header: token,
        }
      )
      .then(async (res) => {
        const products = res.data.products;
        if (products.length > 0) {
          dispatch(setProductsList(products));
        } else {
          toast.error(`No found results for the search "${name}"`, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch(() => {});
  };
};

export const postProduct = async (form, token) => {
  let confirmation = false;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/post-product`, {
      header: token,
      name: form.name,
      price: form.price,
    })
    .then(async (res) => {
      toast.success(res.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      confirmation = true;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
  return confirmation;
};

export const patchProduct = async (form, id, token) => {
  let confirmation = false;
  await axios
    .patch(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/patch-product/${id}`,
      {
        header: token,
        name: form.name,
        price: form.price,
      }
    )
    .then(async (res) => {
      toast.success(res.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      confirmation = true;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
  return confirmation;
};

export const deleteProduct = (id, token) => {
  return async (dispatch) => {
    await axios
      .delete(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-product/${id}`,
        {
          data: {
            header: token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        dispatch(getAllProducts(token));
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
};
