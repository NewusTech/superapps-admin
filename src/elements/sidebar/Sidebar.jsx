import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "elements/sidebar/SidebarItem";
import { ReactComponent as IconPesanan } from "assets/icons/ic-clipboard.svg";
import { ReactComponent as IconPaket } from "assets/icons/ph_package.svg";
import { ReactComponent as IconRiwayatPesanan } from "assets/icons/icon-park-outline_history-query.svg";
import { ReactComponent as IconListPenumpang } from "assets/icons/carbon_list-checked-mirror.svg";
import { ReactComponent as IconDatabase } from "assets/icons/ic_database.svg";
import { ReactComponent as IconLaporan } from "assets/icons/ic_stats.svg";
import { ReactComponent as IconJadwal } from "assets/icons/carbon_event-schedule.svg";
import { ReactComponent as IconMobil } from "assets/icons/ph_car.svg";
import { ReactComponent as IconKursi } from "assets/icons/ic_seat.svg";
import { ReactComponent as IconSupir } from "assets/icons/healthicons_truck-driver.svg";
import { ReactComponent as IconRute } from "assets/icons/ic_route.svg";
import { ReactComponent as IconCabang } from "assets/icons/ic_branch.svg";
import { ReactComponent as IconTitikLokasi } from "assets/icons/ic_pin.svg";
import { ReactComponent as IconUser } from "assets/icons/mdi_user-outline.svg";
import { ReactComponent as IconBuilding } from "assets/icons/ph--building-office.svg";
import { ReactComponent as IconWriteBlog } from "assets/icons/dashicons--welcome-write-blog.svg";
import { Loader, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const { colorActive, colorDactive } = {
  colorActive: "#0705EC",
  colorDactive: "#8C8D89",
};

const kelolaTravelRutes = [
  {
    name: "Pesanan",
    link: "/",
    space: "space-x-1",
    iconA: <IconPesanan stroke={colorActive} />,
    iconD: <IconPesanan stroke={colorDactive} />,
  },
  {
    name: "Jadwal",
    link: "/schedule",
    space: "space-x-3",
    iconA: <IconJadwal fill={colorActive} />,
    iconD: <IconJadwal fill={colorDactive} />,
  },
  {
    name: "Mobil",
    link: "/travel-car",
    space: "space-x-3",
    iconA: <IconMobil fill={colorActive} />,
    iconD: <IconMobil fill={colorDactive} />,
  },
  {
    name: "Kursi",
    link: "/seat",
    space: "space-x-3",
    iconA: <IconKursi fill={colorActive} />,
    iconD: <IconKursi fill={colorDactive} />,
  },
  {
    name: "List Penumpang",
    link: "/passenger-list",
    space: "space-x-2",
    iconA: <IconListPenumpang fill={colorActive} />,
    iconD: <IconListPenumpang fill={colorDactive} />,
  },
  {
    name: "Supir",
    link: "/driver",
    space: "space-x-3",
    iconA: <IconSupir fill={colorActive} />,
    iconD: <IconSupir fill={colorDactive} />,
  },
  {
    name: "Rute",
    link: "/route",
    space: "space-x-3",
    iconA: <IconRute fill={colorActive} />,
    iconD: <IconRute fill={colorDactive} />,
  },
  {
    name: "Cabang",
    link: "/branch",
    space: "space-x-3",
    iconA: <IconCabang fill={colorActive} />,
    iconD: <IconCabang fill={colorDactive} />,
  },
  {
    name: "Titik Lokasi",
    link: "/location-point",
    space: "space-x-2",
    iconA: <IconTitikLokasi fill={colorActive} />,
    iconD: <IconTitikLokasi fill={colorDactive} />,
  },
  {
    name: "Laporan",
    link: "/report",
    space: "space-x-3",
    iconA: <IconLaporan fill={colorActive} />,
    iconD: <IconLaporan fill={colorDactive} />,
  },
];

const KelolaRentalRutes = [
  {
    name: "Pesanan",
    link: "/travel-car-rent",
    space: "space-x-1",
    iconA: <IconPesanan stroke={colorActive} />,
    iconD: <IconPesanan stroke={colorDactive} />,
  },
  {
    name: "Mobil",
    link: "/travel-car-rent/car-master",
    space: "space-x-1",
    iconA: <IconMobil fill={colorActive} />,
    iconD: <IconMobil fill={colorDactive} />,
  },
];

const KelolaPaketRutes = [
  {
    name: "Paket",
    link: "/package",
    space: "space-x-2",
    iconA: <IconPaket fill={colorActive} />,
    iconD: <IconPaket fill={colorDactive} />,
  },
];

const KelolaPenginapanRutes = [
  {
    name: "Pesanan",
    link: "/hostel",
    space: "space-x-2",
    iconA: <IconPesanan stroke={colorActive} />,
    iconD: <IconPesanan stroke={colorDactive} />,
  },
  {
    name: "Apartement",
    link: "/hostel/master-hostel",
    space: "space-x-2",
    iconA: <IconBuilding fill={colorActive} />,
    iconD: <IconBuilding fill={colorDactive} />,
  },
];

const kelolaArtikelRute = [
  {
    name: "Blog",
    link: "/article",
    space: "space-x-3",
    iconA: <IconWriteBlog fill={colorActive} />,
    iconD: <IconWriteBlog fill={colorDactive} />,
  },
  {
    name: "Destinasi",
    link: "/article/article-destination",
    space: "space-x-3",
    iconA: <IconWriteBlog fill={colorActive} />,
    iconD: <IconWriteBlog fill={colorDactive} />,
  },
];

const kelolapenggunaRute = [
  {
    name: "Pengguna",
    link: "/user",
    space: "space-x-3",
    iconA: <IconUser fill={colorActive} />,
    iconD: <IconUser fill={colorDactive} />,
  },
  {
    name: "Peran Pengguna",
    link: "/user/user-role",
    space: "space-x-3",
    iconA: <IconUser fill={colorActive} />,
    iconD: <IconUser fill={colorDactive} />,
  },
  {
    name: "Database Konsumen",
    link: "/consument-list",
    space: "space-x-3",
    iconA: <IconDatabase fill={colorActive} />,
    iconD: <IconDatabase fill={colorDactive} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  let currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white py-5 px-10 shadow-lg fixed overflow-y-auto hide-scrollbar">
      <h2 className="text-2xl text-main py-5 font-bold">Admin</h2>
      <ul className="flex flex-col gap-y-3">
        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">
            Kelola Travel
          </p>
        </div>
        {kelolaTravelRutes.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}
        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">
            Kelola Rental
          </p>
        </div>
        {KelolaRentalRutes.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}
        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">Kelola Paket</p>
        </div>
        {KelolaPaketRutes.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}
        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">
            Kelola Penginapan
          </p>
        </div>
        {KelolaPenginapanRutes.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}
        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">
            Kelola Artikel
          </p>
        </div>
        {kelolaArtikelRute.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}

        <div className="mt-2 mb-1">
          <p className="text-md font-semibold text-neutral-700">
            Kelola Pengguna
          </p>
        </div>
        {kelolapenggunaRute.map((r) => {
          let active = currentPath == r.link ? true : false;
          return (
            <SidebarItem
              key={r.name}
              text={r.name}
              link={r.link}
              active={active}
              space={r.space}
              menuIcon={active ? r.iconA : r.iconD}
            />
          );
        })}

        <Button
          onClick={handleLogout}
          className="flex flex-row group justify-start bg-none px-0 py-0 p-0 h-5 gap-x-3">
          <LogOut className="pl-0.5 w-5 h-5 text-textSecondary group-hover:text-main" />

          <p className="text-md bg-none font-semibold text-textSecondary group-hover:text-main">
            Logout
          </p>
        </Button>
      </ul>
    </div>
  );
};

export default Sidebar;
