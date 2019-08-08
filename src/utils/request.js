import Axios from "axios";

import { message } from "antd";

const axiosInstance = Axios.create({
  baseURL: "/api/",
  timeout: 60 * 1000
});

axiosInstance.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 0) {
      message.error(`请求错误:${res.msg}`, 3000);
      return Promise.reject(res.data);
    } else {
      return res;
    }
  },
  error => {
    message.error("error", 5000);
  }
);

export default axiosInstance;
