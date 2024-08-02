import { axiosJwt } from "./api";

export const getAllPesanan = async () => {
  const data = await axiosJwt.get("/pesanan/pesanan");
  return data.data;
};
