import axios from "axios";

export function setJwt(jwt) {
  axios.defaults.headers.common["td_auth_token"] = jwt;
}

module.exports = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
