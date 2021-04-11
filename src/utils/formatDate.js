function todayDate() {
  return new Date().toLocaleDateString();
}

export function currentYear() {
  const today = todayDate();
  return today.slice(today.lastIndexOf("/") + 1);
}

export function currentMonth() {
  const today = todayDate();
  let month = today.slice(0, today.indexOf("/"));
  if (month < 10) {
    month = "0" + month;
  }

  return month;
}

export function currentDate() {
  const today = todayDate();
  let date = today.slice(today.indexOf("/") + 1, today.lastIndexOf("/"));
  if (date < 10) {
    date = "0" + date;
  }

  return date;
}

export function currentDateToLocalTime() {
  return currentYear() + "-" + currentMonth() + "-" + currentDate();
}
