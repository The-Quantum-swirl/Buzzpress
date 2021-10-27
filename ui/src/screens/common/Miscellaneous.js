
export const DateToMonthYearFormat = (date) => {
  let todaysDate = date.toDateString();
  let dateArr = todaysDate.split(" ");
  return dateArr[1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[3];
};

export const convertDate = (date) => {
  return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
}