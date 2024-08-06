import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL_LOCAL;
const token = Cookies.get("token");

export const getAllPesanan = async (search, status, startDate, endDate) => {
  const response = await fetch(
    `${apiUrl}/pesanan/pesanan?search=${search}&status=${status}&start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );
  return await response.json();
};

export const getAllRute = async () => {
  const response = await fetch(`${apiUrl}/rute/master_rute`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllCabang = async () => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllSupir = async () => {
  const response = await fetch(`${apiUrl}/supir/master_supir`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllMobil = async () => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createNewCar = async (data) => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const createNewDriver = async (data) => {
  const response = await fetch(`${apiUrl}/supir/master_supir`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};
