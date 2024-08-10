import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AuthLayout from "layouts/AuthLayout";
import Layout from "layouts/Layout";
import NoSidebarLayout from "layouts/NoSidebarLayout";
import Article from "pages/artikel/artikel";
import NewArticle from "pages/artikel/newArticle";
import Login from "pages/auth/Login";
import Cabang from "pages/cabang/Cabang";
import TambahCabang from "pages/cabang/TambahCabang";
import Pembayaran from "pages/dashboard/Pembayaran";
import StatusPembayaran from "pages/dashboard/StatusPembayaran";
import TambahKursi from "pages/dashboard/tambahKursi";
import TambahPesanan from "pages/dashboard/TambahPesanan";
import DatabaseKonsumen from "pages/database-konsumen/DatabaseKonsumen";
import Jadwal from "pages/jadwal/Jadwal";
import Kursi from "pages/kursi/Kursi";
import Laporan from "pages/laporan/Laporan";
import ListPenumpang from "pages/list-penumpang/ListPenumpang";
import Mobil from "pages/mobil/Mobil";
import TambahMobil from "pages/mobil/TambahMobil";
import Pengguna from "pages/pengguna/Pengguna";
import TambahPengguna from "pages/pengguna/TambahPengguna";
import PeranPengguna from "pages/peran-pengguna/PeranPengguna";
import TambahPeranPengguna from "pages/peran-pengguna/TambahPeranPengguna";
import RiwayatPesanan from "pages/riwayat-pesanan/RiwayatPesanan";
import Rute from "pages/rute/Rute";
import TambahRute from "pages/rute/TambahRute";
import Supir from "pages/supir/Supir";
import TambahSupir from "pages/supir/TambahSupir";
import TambahTitik from "pages/titik-lokasi/TambahTitik";
import TitikLokasi from "pages/titik-lokasi/TitikLokasi";
import Dashboard from "pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/login",
        element: <Login />,
        loader: () => {
          if (Cookies.get("token")) {
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/choosing-car",
        element: <TambahPesanan />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/order-seat-form/:id",
        element: <TambahKursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/payment-step/:kodePesanan",
        element: <Pembayaran />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order-history",
        element: <RiwayatPesanan />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/passenger-list",
        element: <ListPenumpang />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/schedule",
        element: <Jadwal />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/travel-car",
        element: <Mobil />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/consument-list",
        element: <DatabaseKonsumen />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/travel-car/new-travel-car",
        element: <TambahMobil />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/route",
        element: <Rute />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/route/new-route",
        element: <TambahRute />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/branch",
        element: <Cabang />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/branch/new-branch",
        element: <TambahCabang />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/location-point",
        element: <TitikLokasi />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/location-point/new-location-point",
        element: <TambahTitik />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/seat",
        element: <Kursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/seat/new-seat",
        element: <TambahKursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/driver",
        element: <Supir />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/driver/new-driver",
        element: <TambahSupir />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/report",
        element: <Laporan />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user",
        element: <Pengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/new-user",
        element: <TambahPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/user-role",
        element: <PeranPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/new-user-role",
        element: <TambahPeranPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/article",
        element: <Article />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/article/new-article",
        element: <NewArticle />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/order/payment-status",
    element: <NoSidebarLayout />,
    children: [
      {
        index: true,
        path: "/order/payment-status",
        element: <StatusPembayaran />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
