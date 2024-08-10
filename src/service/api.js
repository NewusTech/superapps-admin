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

export const createNewPesanan = async (data) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan`, {
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

export const deletePesanan = async (id) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
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

export const createNewRute = async (data) => {
  const response = await fetch(`${apiUrl}/rute/master_rute`, {
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

export const deleteRute = async (id) => {
  const response = await fetch(`${apiUrl}/rute/master_rute/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
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

export const createNewCabang = async (data) => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang`, {
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

export const deleteCabang = async (id) => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllTitikLokasi = async () => {
  const response = await fetch(`${apiUrl}/titik_jemput/master_titik_jemput`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const createNewTitikLokasi = async (data) => {
  const response = await fetch(`${apiUrl}/titik_jemput/master_titik_jemput`, {
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

export const deleteTitikLokasi = async (id) => {
  const response = await fetch(
    `${apiUrl}/titik_jemput/master_titik_jemput/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cache: "no-store",
    }
  );
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

export const deleteCar = async (id) => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
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

export const deleteDriver = async (id) => {
  const response = await fetch(`${apiUrl}/supir/master_supir/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllSchedules = async () => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getScheduleSelect = async () => {
  const response = await fetch(`${apiUrl}/jadwal/dropdown-jadwal`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createNewSchedule = async (data) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal`, {
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

export const deleteSchedule = async (id) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });

  return await response.json();
};

export const getSeatsByCar = async (id) => {
  const response = await fetch(`${apiUrl}/kursi/kursi_by_mobil/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const updateStatusSeats = async (id, data) => {
  const response = await fetch(`${apiUrl}/kursi/${id}/update-status`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const getScheduleDetail = async (id) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllArticles = async () => {
  const response = await fetch(`${apiUrl}/artikel/artikel`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createNewArticle = async (data) => {
  const response = await fetch(`${apiUrl}/artikel/artikel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${apiUrl}/artikel/artikel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });

  return await response.json();
};

export const getHistoriPesananByKodePesanan = async (kode) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan/${kode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllPaymentMethods = async () => {
  const response = await fetch(`${apiUrl}/pembayaran/metode-pembayaran`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const makingPayment = async (data) => {
  const response = await fetch(`${apiUrl}/pembayaran/proses_pembayaran`, {
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
