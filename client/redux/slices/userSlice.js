import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {},
});
export default userSlice.reducer;

// -------------------------------------------------------------------------------
export const createUser = async (userForm) => {
  let userConfirmation = false;
  userForm.email = userForm.email.toLowerCase();
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user`, userForm)
    .then(async (res) => {
      const cookies = new Cookies();
      cookies.set("token", res.data.token, { path: "/" });
      toast.success(res.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      userConfirmation = true;
    })
    .catch((e) => {
      toast.error(e.response.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    });
  return userConfirmation;
};

export const userAuthentication = async (userForm) => {
  userForm.email = userForm.email.toLowerCase();
  let userConfirmation = false;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/user-authentication`,
      userForm
    )
    .then(async (res) => {
      const cookies = new Cookies();
      cookies.set("token", res.data.token, { path: "/" });
      toast.success(res.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      userConfirmation = true;
    })
    .catch((e) => {
      toast.error(e.response.data.message, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    });
  return userConfirmation;
};

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  window.location.reload();
};
