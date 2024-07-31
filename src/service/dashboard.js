import axios from "axios";

axios.AxiosHeaders;

const apiUrl = process.env.REACT_APP_API_URL_LOCAL;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllPesanan = async () => {
  const data = await instance.get("/pesanan/pesanan");
  return data.data;
};
