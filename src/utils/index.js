export const functionToMoney = (value) => {
  if (!value) return "0";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export const moneyToFunction = (value) => {
  if (!value) return 0;

  const clean = value
    .replace(/\./g, "") // quitar puntos (miles)
    .replace(/,/g, ".") // convertir la coma decimal en punto
    .replace(/\$/g, "") // quitar el símbolo de dólar
    .replace(/\s/g, ""); // quitar espacios

  const number = Number(clean);
  return isNaN(number) ? 0 : number;
};

export const dateSimulator = (date, day, quotes = 0, endDate = false) => {
  quotes = Number(quotes);
  if (!date) return "";
  const newDate = new Date(date);
  if (!endDate) {
    if (day < newDate.getDate()) {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth());
    }
  } else {
    if (day < newDate.getDate()) {
      newDate.setMonth(newDate.getMonth() + quotes + 1);
    } else {
      newDate.setMonth(newDate.getMonth() + quotes);
    }
  }
  newDate.setDate(day);

  return newDate.toISOString().split("T")[0];
};
