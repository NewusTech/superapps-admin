import React from "react";
import SidebarItem from "./SidebarItem";
import { ReactComponent as IconPesanan } from "../../assets/icons/ic-clipboard.svg";
import { ReactComponent as IconPaket } from "../../assets/icons/ph_package.svg";
import { ReactComponent as IconRiwayatPesanan } from "../../assets/icons/icon-park-outline_history-query.svg";
import { ReactComponent as IconListPenumpang } from "../../assets/icons/carbon_list-checked-mirror.svg";
import { ReactComponent as IconDatabase } from "../../assets/icons/ic_database.svg";
import { ReactComponent as IconLaporan } from "../../assets/icons/ic_stats.svg";
import { ReactComponent as IconJadwal } from "../../assets/icons/carbon_event-schedule.svg";
import { ReactComponent as IconMobil } from "../../assets/icons/ph_car.svg";
import { ReactComponent as IconKursi } from "../../assets/icons/ic_seat.svg";
import { ReactComponent as IconRute } from "../../assets/icons/ic_route.svg";
import { ReactComponent as IconCabang } from "../../assets/icons/ic_branch.svg";
import { ReactComponent as IconTitikLokasi } from "../../assets/icons/ic_pin.svg";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white py-5 px-10 shadow-lg fixed overflow-y-auto">
      <h2 className="text-2xl text-main py-5 font-bold">Admin</h2>
      <ul>
        <SidebarItem
          text="Pesanan"
          link="/dashboard"
          active={true}
          menuIcon={<IconPesanan stroke="#0705EC" />}
        />
        <SidebarItem
          text="Paket"
          link="/paket"
          space={"space-x-2"}
          menuIcon={<IconPaket fill="#8C8D89" />}
        />
        <SidebarItem
          text="Riwayat Pesanan"
          link="/riwayat-pesanan"
          space={"space-x-2"}
          menuIcon={<IconRiwayatPesanan stroke="#8C8D89" />}
        />
        <SidebarItem
          text="List Penumpang"
          link="/list-penumpang"
          space={"space-x-2"}
          menuIcon={<IconListPenumpang fill="#8C8D89" />}
        />
        <SidebarItem
          text="Database Konsumen"
          link="/database-konsumen"
          space={"space-x-3"}
          menuIcon={<IconDatabase fill="#8C8D89" />}
        />
        <SidebarItem
          text="Laporan"
          link="/laporan"
          space={"space-x-3"}
          menuIcon={<IconLaporan fill="#8C8D89" />}
        />

        <SidebarItem text="Kelola Travel" />
        <SidebarItem
          text="Jadwal"
          link="/jadwal"
          space={"space-x-3"}
          menuIcon={<IconJadwal fill="#8C8D89" />}
        />
        <SidebarItem
          text="Mobil"
          link="/mobil"
          space={"space-x-3"}
          menuIcon={<IconMobil fill="#8C8D89" />}
        />
        <SidebarItem
          text="Kursi"
          link="/kursi"
          space={"space-x-3"}
          menuIcon={<IconKursi fill="#8C8D89" />}
        />
        <SidebarItem
          text="Rute"
          link="/rute"
          space={"space-x-3"}
          menuIcon={<IconRute fill="#8C8D89" />}
        />
        <SidebarItem
          text="Cabang"
          link="/cabang"
          space={"space-x-3"}
          menuIcon={<IconCabang fill="#8C8D89" />}
        />
        <SidebarItem
          text="Titik Lokasi"
          link="/titik-lokasi"
          space={"space-x-2"}
          menuIcon={<IconTitikLokasi fill="#8C8D89" />}
        />

        <SidebarItem text="Kelola Artikel" />
        <SidebarItem
          text="Artikel"
          link="/artikel"
          space={"space-x-3"}
          menuIcon={<IconJadwal fill="#8C8D89" />}
        />

        <SidebarItem text="Kelola Pengguna" />
        <SidebarItem
          text="Pengguna"
          link="/pengguna"
          space={"space-x-3"}
          menuIcon={<IconJadwal fill="#8C8D89" />}
        />
        <SidebarItem
          text="Peran Pengguna"
          link="/peran-pengguna"
          space={"space-x-3"}
          menuIcon={<IconJadwal fill="#8C8D89" />}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
