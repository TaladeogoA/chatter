import { formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";

export function parseDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

export function daysSinceDate(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
