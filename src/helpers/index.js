export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  return `${hours}.${minutes} WIB`;
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
