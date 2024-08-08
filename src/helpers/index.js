export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  return `${hours}.${minutes} WIB`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateInput(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function formatLongDate(dateString) {
  const [day, month, year] = dateString.split("-");

  const date = new Date(`${year}-${month}-${day}`);
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export function formatTanggalPanjang(tanggal) {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateObj = new Date(tanggal);
  const hari = dateObj.getDate();
  const bulan = bulanIndonesia[dateObj.getMonth()];
  const tahun = dateObj.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
}

export const formatDateArrange = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function truncateText(title, maxLength = 35) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}
