export const getDateToday = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const time = String(today.getHours()) + ":" + String(today.getMinutes());

  return yyyy + "-" + mm + "-" + dd + "T" + time;
};
