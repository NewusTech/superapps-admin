import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AuthLayout from "layouts/AuthLayout";
import Layout from "layouts/Layout";
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
import UpdateStatusPembayaran from "pages/dashboard/updateStatusPembayaran";
import TravelCarUpdate from "pages/mobil/travelCarUpdate";
import DriverUpdate from "pages/supir/driverUpdate";
import RouteUpdate from "pages/rute/routeUpdate";
import BranchUpdate from "pages/cabang/BranchUpdate";
import LocationPointUpdate from "pages/titik-lokasi/LocationPointUpdate";
import UpdateArticle from "pages/artikel/updateArticle";
import ScheduleUpdate from "pages/jadwal/ScheduleUpdate";
import DetailPesanan from "pages/dashboard/DetailPesanan";
import Paket from "pages/paket/Paket";
import TambahPaket from "pages/paket/TambahPaket";
import PembayaranPaket from "pages/paket/pembayaran";
import UpdateStatusPembayaranPackage from "pages/paket/updateStatusPembayaran";
import StatusPackagePembayaran from "pages/paket/statusPembayaran";
import DetailPaket from "pages/paket/detailPaket";

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
        path: "/order/detail-order/:bookingCode",
        element: <DetailPesanan />,
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
        path: "/order/update-payment-status/:kodePesanan",
        element: <UpdateStatusPembayaran />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/order/payment-status/:kodePembayaran",
        element: <StatusPembayaran />,
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
        path: "/package",
        element: <Paket />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/package/detail-package/:kodeResi",
        element: <DetailPaket />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/package/create-package",
        element: <TambahPaket />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/package/payment-step/:kodeResi",
        element: <PembayaranPaket />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/package/update-payment-status-package/:kodeResi",
        element: <UpdateStatusPembayaranPackage />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/package/package-payment-status/:kodePaket",
        element: <StatusPackagePembayaran />,
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
        path: "/schedule/update-schedule/:id",
        element: <ScheduleUpdate />,
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
        path: "/travel-car/update-travel-car/:id",
        element: <TravelCarUpdate />,
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
        path: "/route/update-route/:id",
        element: <RouteUpdate />,
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
        path: "/branch/update-branch/:id",
        element: <BranchUpdate />,
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
        path: "/location-point/update-location-point/:id",
        element: <LocationPointUpdate />,
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
        path: "/driver/update-driver/:id",
        element: <DriverUpdate />,
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
      {
        path: "/article/update-article/:id",
        element: <UpdateArticle />,
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
