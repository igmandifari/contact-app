import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {

        console.error("Network Error:", error.message);
      } else {
        console.error("HTTP Error:", error.response.status);
        console.error("Error Data:", error.response.data);
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
