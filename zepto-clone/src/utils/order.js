import { format } from "date-fns";

export const generateId=(length)=>{
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const formatDate = (timestamp) => {
  const milliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
  const date = new Date(milliseconds);
  const formattedDate = format(date, "M/d/yyyy, h:mm:ss a");
  return formattedDate;
};
