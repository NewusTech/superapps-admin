import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard/Dashboard";
import RiwayatPesanan from "pages/riwayat-pesanan/RiwayatPesanan";
import ListPenumpang from "pages/list-penumpang/ListPenumpang";
// import Paket from "pages/paket/Paket";
import Layout from "layouts/Layout";
import DatabaseKonsumen from "pages/database-konsumen/DatabaseKonsumen";
import Login from "pages/auth/Login";
import AuthLayout from "layouts/AuthLayout";
import Jadwal from "pages/jadwal/Jadwal";
import Mobil from "pages/mobil/Mobil";
import Rute from "pages/rute/Rute";
import Cabang from "pages/cabang/Cabang";
import TitikLokasi from "pages/titik-lokasi/TitikLokasi";
import Kursi from "pages/kursi/Kursi";
import Laporan from "pages/laporan/Laporan";
import Pengguna from "pages/pengguna/Pengguna";
import TambahPengguna from "pages/pengguna/TambahPengguna";
import PeranPengguna from "pages/peran-pengguna/PeranPengguna";
import TambahPeranPengguna from "pages/peran-pengguna/TambahPeranPengguna";
import TambahPesanan from "pages/dashboard/TambahPesanan";
import Pembayaran from "pages/dashboard/Pembayaran";
import NoSidebarLayout from "layouts/NoSidebarLayout";
import StatusPembayaran from "pages/dashboard/StatusPembayaran";
import TambahPaket from "pages/paket/TambahPaket";
import TambahMobil from "pages/mobil/TambahMobil";
import TambahRute from "pages/rute/TambahRute";
import Supir from "pages/supir/Supir";
import TambahSupir from "pages/supir/TambahSupir";
import TambahCabang from "pages/cabang/TambahCabang";
import TambahTitik from "pages/titik-lokasi/TambahTitik";
import Cookies from "js-cookie";
import Article from "pages/artikel/artikel";
import TambahKursi from "pages/dashboard/tambahKursi";
import NewArticle from "pages/artikel/newArticle";

const App = () => {
  return (
    <main className="flex font-poppins">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route>
          {/* <Route index element={<Navigate to="/" />} /> */}
          <Route element={<Layout />}>
            <Route
              index
              path="/"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            {/* <Route
              path="/paket"
              element={<ProtectedRoute element={<Paket />} />}
            /> */}
            <Route
              path="/riwayat-pesanan"
              element={<ProtectedRoute element={<RiwayatPesanan />} />}
            />
            <Route
              path="/list-penumpang"
              element={<ProtectedRoute element={<ListPenumpang />} />}
            />
            <Route
              path="/database-konsumen"
              element={<ProtectedRoute element={<DatabaseKonsumen />} />}
            />
            <Route
              path="/jadwal"
              element={<ProtectedRoute element={<Jadwal />} />}
            />
            <Route
              path="/mobil"
              element={<ProtectedRoute element={<Mobil />} />}
            />
            <Route
              path="/mobil/tambah"
              element={<ProtectedRoute element={<TambahMobil />} />}
            />
            <Route
              path="/rute"
              element={<ProtectedRoute element={<Rute />} />}
            />
            <Route
              path="/rute/tambah"
              element={<ProtectedRoute element={<TambahRute />} />}
            />
            <Route
              path="/cabang"
              element={<ProtectedRoute element={<Cabang />} />}
            />
            <Route
              path="/cabang/tambah"
              element={<ProtectedRoute element={<TambahCabang />} />}
            />
            <Route
              path="/titik-lokasi"
              element={<ProtectedRoute element={<TitikLokasi />} />}
            />
            <Route
              path="/titik-lokasi/tambah"
              element={<ProtectedRoute element={<TambahTitik />} />}
            />
            <Route
              path="/kursi"
              element={<ProtectedRoute element={<Kursi />} />}
            />
            <Route
              path="/supir"
              element={<ProtectedRoute element={<Supir />} />}
            />
            <Route
              path="/supir/tambah"
              element={<ProtectedRoute element={<TambahSupir />} />}
            />
            <Route
              path="/laporan"
              element={<ProtectedRoute element={<Laporan />} />}
            />
            <Route
              path="/pengguna"
              element={<ProtectedRoute element={<Pengguna />} />}
            />
            <Route
              path="/pengguna/tambah"
              element={<ProtectedRoute element={<TambahPengguna />} />}
            />
            <Route
              path="/peran-pengguna"
              element={<ProtectedRoute element={<PeranPengguna />} />}
            />
            <Route
              path="/tambah-peran-pengguna"
              element={<ProtectedRoute element={<TambahPeranPengguna />} />}
            />
            <Route
              path="/pesanan/tambah"
              element={<ProtectedRoute element={<TambahPesanan />} />}
            />
            <Route
              path="/pesanan/kursi/:id"
              element={<ProtectedRoute element={<TambahKursi />} />}
            />
            <Route
              path="/pesanan/pembayaran/:kodePesanan"
              element={<ProtectedRoute element={<Pembayaran />} />}
            />
            <Route
              path="/paket/tambah"
              element={<ProtectedRoute element={<TambahPaket />} />}
            />
            <Route
              path="/artikel"
              element={<ProtectedRoute element={<Article />} />}
            />
            <Route
              path="/artikel/added"
              element={<ProtectedRoute element={<NewArticle />} />}
            />
          </Route>

          <Route element={<NoSidebarLayout />}>
            <Route
              path="/pesanan/status-pembayaran"
              element={<ProtectedRoute element={<StatusPembayaran />} />}
            />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("token");

  if (!token) {
    return (
      <Navigate to="/login" replace state={{ message: "Token invalid" }} />
    );
  }

  return element;
};

export default App;
