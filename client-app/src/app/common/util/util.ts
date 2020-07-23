export const combineDateAndTime = (dueDate: Date, dueTime: Date) => {
  const timeString = dueTime.getHours() + ":" + dueTime.getMinutes() + ":00";

  const year = dueDate.getFullYear();
  const month = dueDate.getMonth() + 1;
  const day = dueDate.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + " " + timeString);
};
