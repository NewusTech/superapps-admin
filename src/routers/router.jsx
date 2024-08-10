import Cookies from "js-cookie";
import NoSidebarLayout from "layouts/NoSidebarLayout";
import Login from "pages/auth/Login";
const { createBrowserRouter, redirect } = require("react-router-dom");
const { default: AuthLayout } = require("layouts/AuthLayout");
const { default: Layout } = require("layouts/Layout");
const { default: Article } = require("pages/artikel/artikel");
const { default: NewArticle } = require("pages/artikel/newArticle");
const { default: Cabang } = require("pages/cabang/Cabang");
const { default: TambahCabang } = require("pages/cabang/TambahCabang");
const { default: Dashboard } = require("pages/dashboard/Dashboard");
const { default: Pembayaran } = require("pages/dashboard/Pembayaran");
const {
  default: StatusPembayaran,
} = require("pages/dashboard/StatusPembayaran");
const { default: TambahKursi } = require("pages/dashboard/tambahKursi");
const { default: TambahPesanan } = require("pages/dashboard/TambahPesanan");
const {
  default: DatabaseKonsumen,
} = require("pages/database-konsumen/DatabaseKonsumen");
const { default: Jadwal } = require("pages/jadwal/Jadwal");
const { default: Kursi } = require("pages/kursi/Kursi");
const { default: Laporan } = require("pages/laporan/Laporan");
const {
  default: ListPenumpang,
} = require("pages/list-penumpang/ListPenumpang");
const { default: Mobil } = require("pages/mobil/Mobil");
const { default: TambahMobil } = require("pages/mobil/TambahMobil");
const { default: Pengguna } = require("pages/pengguna/Pengguna");
const { default: TambahPengguna } = require("pages/pengguna/TambahPengguna");
const {
  default: PeranPengguna,
} = require("pages/peran-pengguna/PeranPengguna");
const {
  default: TambahPeranPengguna,
} = require("pages/peran-pengguna/TambahPeranPengguna");
const {
  default: RiwayatPesanan,
} = require("pages/riwayat-pesanan/RiwayatPesanan");
const { default: Rute } = require("pages/rute/Rute");
const { default: TambahRute } = require("pages/rute/TambahRute");
const { default: Supir } = require("pages/supir/Supir");
const { default: TambahSupir } = require("pages/supir/TambahSupir");
const { default: TambahTitik } = require("pages/titik-lokasi/TambahTitik");
const { default: TitikLokasi } = require("pages/titik-lokasi/TitikLokasi");

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
            redirect("/");
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
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/choosing-car",
        element: <TambahPesanan />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/order-seat-form/:id",
        element: <TambahKursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/payment-step/:kodePesanan",
        element: <Pembayaran />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order-history",
        element: <RiwayatPesanan />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/passenger-list",
        element: <ListPenumpang />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/schedule",
        element: <Jadwal />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/travel-car",
        element: <Mobil />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/consument-list",
        element: <DatabaseKonsumen />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/travel-car/new-travel-car",
        element: <TambahMobil />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/route",
        element: <Rute />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/route/new-route",
        element: <TambahRute />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/branch",
        element: <Cabang />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/branch/new-branch",
        element: <TambahCabang />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/location-point",
        element: <TitikLokasi />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/location-point/new-location-point",
        element: <TambahTitik />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/seat",
        element: <Kursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/seat/new-seat",
        element: <TambahKursi />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/driver",
        element: <Supir />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/driver/new-driver",
        element: <TambahSupir />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/report",
        element: <Laporan />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user",
        element: <Pengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/new-user",
        element: <TambahPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/user-role",
        element: <PeranPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/user/new-user-role",
        element: <TambahPeranPengguna />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "article",
        element: <Article />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
      {
        path: "article/new-article",
        element: <NewArticle />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/pesanan/status-pembayaran",
    element: <NoSidebarLayout />,
    children: [
      {
        index: true,
        path: "/pesanan/status-pembayaran",
        element: <StatusPembayaran />,
        loader: () => {
          if (!Cookies.get("token")) {
            redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
