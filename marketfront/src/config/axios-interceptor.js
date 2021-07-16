import axios from "axios";
// import Admin from "../store/modules/admin.module";

axios.interceptors.request.use(
  (request) => {
    const jwToken = localStorage.getItem("jwToken");
    if (jwToken) {
      request.headers["Authorization"] = `Bearer ${jwToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
