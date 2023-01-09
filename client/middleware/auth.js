import axios from "axios";

module.exports.auth = async (token) => {
  let userRegistered = false;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/token-validation`, {
      token,
    })
    .then(() => {
      userRegistered = true;
    })
    .catch(() => {});
  return userRegistered;
};
