import axios from "axios";

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
