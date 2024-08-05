import React from "react";
import { useLocation } from "react-router-dom";
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

const { colorActive, colorDactive } = {
  colorActive: "#0705EC",
  colorDactive: "#8C8D89",
};

const transsactionRute = [
  {
    name: "Pesanan",
    link: "/dashboard",
    space: "space-x-1",
    iconA: <IconPesanan stroke={colorActive} />,
    iconD: <IconPesanan stroke={colorDactive} />,
  },
  {
    name: "Paket",
    link: "/paket",
    space: "space-x-2",
    iconA: <IconPaket fill={colorActive} />,
    iconD: <IconPaket fill={colorDactive} />,
  },
  {
    name: "Riwayat Pesanan",
    link: "/riwayat-pesanan",
    space: "space-x-2",
    iconA: <IconRiwayatPesanan stroke={colorActive} />,
    iconD: <IconRiwayatPesanan stroke={colorDactive} />,
  },
  {
    name: "List Penumpang",
    link: "/list-penumpang",
    space: "space-x-2",
    iconA: <IconListPenumpang fill={colorActive} />,
    iconD: <IconListPenumpang fill={colorDactive} />,
  },
  {
    name: "Database Konsumen",
    link: "/database-konsumen",
    space: "space-x-3",
    iconA: <IconDatabase fill={colorActive} />,
    iconD: <IconDatabase fill={colorDactive} />,
  },
  {
    name: "Laporan",
    link: "/laporan",
    space: "space-x-3",
    iconA: <IconLaporan fill={colorActive} />,
    iconD: <IconLaporan fill={colorDactive} />,
  },
];

const keloraTravelRute = [
  {
    name: "Jadwal",
    link: "/jadwal",
    space: "space-x-3",
    iconA: <IconJadwal fill={colorActive} />,
    iconD: <IconJadwal fill={colorDactive} />,
  },
  {
    name: "Mobil",
    link: "/mobil",
    space: "space-x-3",
    iconA: <IconMobil fill={colorActive} />,
    iconD: <IconMobil fill={colorDactive} />,
  },
  {
    name: "Kursi",
    link: "/kursi",
    space: "space-x-3",
    iconA: <IconKursi fill={colorActive} />,
    iconD: <IconKursi fill={colorDactive} />,
  },
  {
    name: "Supir",
    link: "/supir",
    space: "space-x-3",
    iconA: <IconSupir fill={colorActive} />,
    iconD: <IconSupir fill={colorDactive} />,
  },
  {
    name: "Rute",
    link: "/rute",
    space: "space-x-3",
    iconA: <IconRute fill={colorActive} />,
    iconD: <IconRute fill={colorDactive} />,
  },
  {
    name: "Cabang",
    link: "/cabang",
    space: "space-x-3",
    iconA: <IconCabang fill={colorActive} />,
    iconD: <IconCabang fill={colorDactive} />,
  },
  {
    name: "Titik Lokasi",
    link: "/titik-lokasi",
    space: "space-x-2",
    iconA: <IconTitikLokasi fill={colorActive} />,
    iconD: <IconTitikLokasi fill={colorDactive} />,
  },
];

const kelolaArtikelRute = [
  {
    name: "Artikel",
    link: "/artikel",
    space: "space-x-3",
    iconA: <IconJadwal fill={colorActive} />,
    iconD: <IconJadwal fill={colorDactive} />,
  },
];
const kelolapenggunaRute = [
  {
    name: "Pengguna",
    link: "/pengguna",
    space: "space-x-3",
    iconA: <IconUser fill={colorActive} />,
    iconD: <IconUser fill={colorDactive} />,
  },
  {
    name: "Peran Pengguna",
    link: "/peran-pengguna",
    space: "space-x-3",
    iconA: <IconUser fill={colorActive} />,
    iconD: <IconUser fill={colorDactive} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  let currentPath = location.pathname;
  return (
    <div className="w-64 h-screen bg-white py-5 px-10 shadow-lg fixed overflow-y-auto">
      <h2 className="text-2xl text-main py-5 font-bold">Admin</h2>
      <ul>
        {transsactionRute.map((r) => {
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
          <SidebarItem text="Kelola Travel" />
        </div>
        {keloraTravelRute.map((r) => {
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
        <div className="mt-10 mb-1">
          <SidebarItem text="Kelola Artikel" />
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
        <div className="mt-5 mb-1">
          <SidebarItem text="Kelola Pengguna" />
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
      </ul>
    </div>
  );
};

export default Sidebar;
