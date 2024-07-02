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
            <Route path="/rute" element={<ProtectedRoute element={<Rute />} />} />
            <Route path="/cabang" element={<ProtectedRoute element={<Cabang />} />} />
            <Route path="/titik-lokasi" element={<ProtectedRoute element={<TitikLokasi />} />} />
            <Route path="/kursi" element={<ProtectedRoute element={<Kursi />} />} />
            <Route path="/pengguna" element={<ProtectedRoute element={<Pengguna />} />} />
            <Route
              path="/pengguna/tambah"
              element={<ProtectedRoute element={<TambahPengguna />} />}
            />
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
