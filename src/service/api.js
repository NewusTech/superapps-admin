import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL_LOCAL;

export const LoginApi = async (data) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const getAllPesanan = async (search, status, startDate, endDate) => {
  const response = await fetch(
    `${apiUrl}/pesanan/pesanan?search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getDetailPesanan = async (bookingCode) => {
  const response = await fetch(`${apiUrl}/pesanan/riwayat/${bookingCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const createNewPesanan = async (data) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
  return await response.json();
};

export const getOrderHistoryByOrderCode = async (kodePesanan) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan/${kodePesanan}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const getAllRute = async () => {
  const response = await fetch(`${apiUrl}/rute/master_rute`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      // "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });
  return await response.json();
};

export const getRuteById = async (id) => {
  const response = await fetch(`${apiUrl}/rute/master_rute/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const updateRute = async (id, data) => {
  const response = await fetch(`${apiUrl}/rute/master_rute/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      // "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });
  return await response.json();
};

export const deleteRute = async (id) => {
  const response = await fetch(`${apiUrl}/rute/master_rute/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const getCabangById = async (id) => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const UpdateCabang = async (id, data) => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const deleteCabang = async (id) => {
  const response = await fetch(`${apiUrl}/cabang/master_cabang/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const getTitikLokasiByid = async (id) => {
  const response = await fetch(
    `${apiUrl}/titik_jemput/master_titik_jemput/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );
  return await response.json();
};

export const updateTitikLokasi = async (id, data) => {
  const response = await fetch(
    `${apiUrl}/titik_jemput/master_titik_jemput/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  return await response.json();
};

export const deleteTitikLokasi = async (id) => {
  const response = await fetch(
    `${apiUrl}/titik_jemput/master_titik_jemput/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getMobilById = async (id) => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const updateTravelCar = async (id, data) => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const createNewCar = async (data) => {
  const response = await fetch(`${apiUrl}/mobil/master_mobil`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const getDriverById = async (id) => {
  const response = await fetch(`${apiUrl}/supir/master_supir/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const updateDriver = async (id, data) => {
  const response = await fetch(`${apiUrl}/supir/master_supir/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return await response.json();
};

export const deleteDriver = async (id) => {
  const response = await fetch(`${apiUrl}/supir/master_supir/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const getScheduleById = async (id) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal/${id}/edit`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getScheduleByDate = async (date) => {
  const response = await fetch(`${apiUrl}/jadwal/tanggal/${date}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const updateSchedule = async (id, data) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const deleteSchedule = async (id) => {
  const response = await fetch(`${apiUrl}/jadwal/jadwal/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getArticleById = async (id) => {
  const response = await fetch(`${apiUrl}/artikel/artikel/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllDestination = async (search) => {
  const response = await fetch(`${apiUrl}/pariwisata?search=${search}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createNewDestination = async (data) => {
  const response = await fetch(`${apiUrl}/pariwisata`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};

export const deleteDestination = async (id) => {
  const response = await fetch(`${apiUrl}/pariwisata/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });

  return await response.json();
};

export const updateDestination = async (id, data) => {
  const response = await fetch(`${apiUrl}/pariwisata/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};

export const getHistoriPesananByKodePesanan = async (kode) => {
  const response = await fetch(`${apiUrl}/pesanan/pesanan/${kode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
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
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const updatePaymentStatus = async (kodePesanan) => {
  const response = await fetch(
    `${apiUrl}/pembayaran/update-status/${kodePesanan}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getPaymentStatus = async (paymentCode) => {
  const response = await fetch(`${apiUrl}/pembayaran/status/${paymentCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getDownloadTicket = async (paymentCode) => {
  const response = await fetch(`${apiUrl}/pesanan/tiket/${paymentCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getDownloadInvoice = async (paymentCode) => {
  const response = await fetch(`${apiUrl}/pesanan/invoice/${paymentCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllPackages = async (search, startDate, endDate) => {
  const response = await fetch(
    `${apiUrl}/paket/paket?search=${search}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getDetailPackage = async (kodeResi) => {
  const response = await fetch(`${apiUrl}/paket/paket/${kodeResi}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const createNewPackage = async (data) => {
  const response = await fetch(`${apiUrl}/paket/paket`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

// status pembayaran package
export const getPackageHistoryByResi = async (kodeResi) => {
  const response = await fetch(`${apiUrl}/paket/paket/${kodeResi}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  return await response.json();
};

export const makingPackagePayment = async (data) => {
  const response = await fetch(`${apiUrl}/paket/proses-pembayaran`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

export const updatePackagePaymentStatus = async (kodeResi) => {
  const response = await fetch(
    `${apiUrl}/paket/status-pembayaran/update/${kodeResi}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getPaymentStatusPackage = async (kodePaket) => {
  const response = await fetch(
    `${apiUrl}/paket/status-pembayaran/${kodePaket}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getDownloadResiPackage = async (paymentCode) => {
  const response = await fetch(
    `${apiUrl}/paket/label/download/${paymentCode}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getDownloadInvoicePackage = async (paymentCode) => {
  const response = await fetch(`${apiUrl}/pesanan/invoice/${paymentCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllTravelCarRent = async (
  search,
  status,
  startDate,
  endDate
) => {
  const response = await fetch(
    `${apiUrl}/rental/riwayat?search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getDetailTravelCarRent = async (kodePembayaran) => {
  const response = await fetch(`${apiUrl}/rental/riwayat/${kodePembayaran}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getAllMasterTravelCarRent = async () => {
  const response = await fetch(`${apiUrl}/rental/mobil`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createNewMasterCarRent = async (data) => {
  const response = await fetch(`${apiUrl}/rental/mobil`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      // "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};

export const getDetailMasterTravelCarRent = async (id) => {
  const response = await fetch(`${apiUrl}/rental/mobil/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const createTravelCarRent = async (data) => {
  const response = await fetch(`${apiUrl}/rental/process-payment`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};

export const updateRentalStatusPayment = async (kodePembayaran) => {
  const response = await fetch(
    `${apiUrl}/rental/status-pembayaran/update/${kodePembayaran}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateRentalStatusPaymentAdmin = async (kodePembayaran, data) => {
  const response = await fetch(
    `${apiUrl}/rental/confirm-payment/${kodePembayaran}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getAllCustomerList = async (search, startDate, endDate) => {
  const response = await fetch(
    `${apiUrl}/perjalanan/list-penumpang?search=${search}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getAllReports = async (search, startDate, endDate) => {
  const response = await fetch(
    `${apiUrl}/laporan?search=${search}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const getAllMasterPenginapan = async () => {
  const response = await fetch(`${apiUrl}/master_penginapan/penginapan`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  return await response.json();
};

export const getMasterDataCreate = async () => {
  const response = await fetch(
    `${apiUrl}/master_penginapan/penginapan/create`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-store",
    }
  );

  return await response.json();
};

export const createNewMasterApartement = async (data) => {
  const response = await fetch(`${apiUrl}/master_penginapan/penginapan`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      // "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return await response.json();
};
