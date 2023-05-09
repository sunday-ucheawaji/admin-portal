import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_URL;
// const baseUrl = 'https://dev-admin.monirates.com/v1'

const token = localStorage?.getItem("token");

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("intercepted, *****");
    return response;
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      // Call your log out function here
      toast.info("Session Expired");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return error;
  }
);

export default apiClient;
