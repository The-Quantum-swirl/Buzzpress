export const DateToMonthYearFormat = (date) => {
  const month =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let dateArr = date.split("-");
  return month[Number(dateArr[1])-1] + " " + Number(dateArr[2]).toString() + ", " + dateArr[0];
};

export const convertDate = (date) => {
  return date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate();
}

export const thumbUrl = () => "https://miro.medium.com/fit/c/300/201/0*J8_v8vmIyMZgQFhK";