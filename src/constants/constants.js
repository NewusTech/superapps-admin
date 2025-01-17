export const dataFilters = [
  {
    name: "Semua",
    filter: "",
  },
  {
    name: "Sukses",
    filter: "Sukses",
  },
  {
    name: "Menunggu",
    filter: "Menunggu",
  },
  {
    name: "Gagal",
    filter: "Gagal",
  },
];

export const columns = [
  { key: "no", label: "No" },
  { key: "nama_pemesan", label: "Nama" },
  { key: "rute", label: "Rute" },
  { key: "jam_berangkat", label: "Jam Berangkat" },
  { key: "tanggal_berangkat", label: "Tanggal" },
  { key: "mobil", label: "Mobil" },
  { key: "supir", label: "Supir" },
  { key: "harga", label: "Harga" },
  { key: "status", label: "Status" },
  { key: "print", label: "Print" },
];

export const columnPakets = [
  { key: "no", label: "No" },
  { key: "kode_resi", label: "Kode Resi" },
  { key: "nama_pengirim", label: "Nama Pengirim" },
  // { key: "no_telp_pengirim", label: "Nomor Telepon Pengirim" },
  // { key: "alamat_pengirim", label: "Alamat Pengirim" },
  // { key: "tanggal_dikirim", label: "Tanggal Dikirim" },
  { key: "nama_penerima", label: "Nama Penerima" },
  // { key: "alamat_penerima", label: "Alamat Penerima" },
  // { key: "no_telp_penerima", label: "Nomor Telepon Penerima" },
  // { key: "tanggal_diterima", label: "Tanggal Diterima" },
  { key: "jenis_paket", label: "jenis Paket" },
  { key: "berat_paket", label: "Berat Paket" },
  { key: "biaya", label: "Biaya Pengiriman" },
  { key: "print", label: "Print" },
];

export const columnRentals = [
  { key: "no", label: "No" },
  { key: "nama", label: "Nama" },
  { key: "mobil_type", label: "Tipe Mobil" },
  { key: "area", label: "Area" },
  { key: "durasi_sewa", label: "Durasi Sewa" },
  { key: "tanggal_awal_sewa", label: "Tanggal Mulai" },
  { key: "tanggal_akhir_sewa", label: "Tanggal Selesai" },
  { key: "harga", label: "Harga" },
  { key: "status", label: "Status" },
  { key: "print", label: "Print" },
];

export const columnCustomers = [
  { key: "no", label: "No" },
  { key: "supir", label: "Supir" },
  { key: "rute", label: "Rute" },
  { key: "jam_berangkat", label: "Jam Keberangkatan" },
  { key: "tanggal_berangkat", label: "Tanggal Keberangkatan" },
  { key: "mobil", label: "Mobil" },
  { key: "print", label: "Print" },
];

export const columnReports = [
  { key: "no", label: "No" },
  { key: "rute", label: "Rute" },
  { key: "mobil", label: "Mobil" },
  // { key: "supir", label: "Supir" },
  { key: "jam_berangkat", label: "Jam Keberangkatan" },
  { key: "tanggal_berangkat", label: "Tanggal Keberangkatan" },
  { key: "jumlah_penumpang", label: "Jumlah Penumpang" },
  { key: "jumlah_harga", label: "Jumlah Harga" },
];

export const columnHotels = [
  { key: "no", label: "No" },
  // { key: "no_pesanan", label: "No Pesanan" },
  { key: "nama", label: "Nama" },
  { key: "mobil", label: "Mobil" },
  { key: "tanggal_checkin", label: "Tanggal Check In" },
  { key: "tanggal_checkout", label: "Tanggal Check Out" },
  { key: "biaya", label: "Biaya" },
  { key: "status", label: "Status" },
  { key: "print", label: "Print" },
];
