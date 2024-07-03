import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import RiwayatPesanan from './pages/riwayat-pesanan/RiwayatPesanan';
import ListPenumpang from './pages/list-penumpang/ListPenumpang';
import Paket from './pages/paket/Paket';
import Layout from './layouts/Layout';
import DatabaseKonsumen from './pages/database-konsumen/DatabaseKonsumen';
import Login from './pages/auth/Login';
import AuthLayout from './layouts/AuthLayout';
import Jadwal from './pages/jadwal/Jadwal';
import Mobil from './pages/mobil/Mobil';
import Rute from './pages/rute/Rute';
import Cabang from './pages/cabang/Cabang';
import TitikLokasi from './pages/titik-lokasi/TitikLokasi';
import Kursi from './pages/kursi/Kursi';
import Pengguna from './pages/pengguna/Pengguna';
import TambahPengguna from './pages/pengguna/TambahPengguna';
import Peran from './pages/peran-pengguna/Peran';
import TambahPeran from './pages/peran-pengguna/TambahPeran';
import TambahRute from './pages/rute/TambahRute';
import TambahCabang from './pages/cabang/TambahCabang';
import TambahTitik from './pages/titik-lokasi/TambahTitik';
import Supir from './pages/supir/Supir';
import TambahSupir from './pages/supir/TambahSupir';
import TambahMobil from './pages/mobil/TambahMobil';

const App = () => {
  return (
    <main className="flex font-poppins">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/paket" element={<ProtectedRoute element={<Paket />} />} />
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
            <Route path="/jadwal" element={<ProtectedRoute element={<Jadwal />} />} />

            <Route path="/mobil" element={<ProtectedRoute element={<Mobil />} />} />
            <Route path="/mobil/tambah" element={<ProtectedRoute element={<TambahMobil />} />} />

            <Route path="/rute" element={<ProtectedRoute element={<Rute />} />} />
            <Route path="/rute/tambah" element={<ProtectedRoute element={<TambahRute />} />} />

            <Route path="/cabang" element={<ProtectedRoute element={<Cabang />} />} />
            <Route path="/cabang/tambah" element={<ProtectedRoute element={<TambahCabang />} />} />

            <Route path="/titik-lokasi" element={<ProtectedRoute element={<TitikLokasi />} />} />
            <Route path="/titik/tambah" element={<ProtectedRoute element={<TambahTitik />} />} />

            <Route path="/kursi" element={<ProtectedRoute element={<Kursi />} />} />

            <Route path="/supir" element={<ProtectedRoute element={<Supir />} />} />
            <Route path="/supir/tambah" element={<ProtectedRoute element={<TambahSupir />} />} />

            <Route path="/pengguna" element={<ProtectedRoute element={<Pengguna />} />} />
            <Route
              path="/pengguna/tambah"
              element={<ProtectedRoute element={<TambahPengguna />} />}
            />
            <Route path="/peran-pengguna" element={<ProtectedRoute element={<Peran />} />} />
            <Route path="/peran/tambah" element={<ProtectedRoute element={<TambahPeran />} />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return expiry > Date.now();
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace state={{ message: 'Token invalid' }} />;
  }

  return element;
};

export default App;
