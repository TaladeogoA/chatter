import { Timestamp } from "firebase/firestore";

export const formatPostedOn = (postedOn: Timestamp) => {
  const date = new Date(
    postedOn.seconds * 1000 + postedOn.nanoseconds / 1000000
  );
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  return { day, month, year };
};

export const timestampToDaysSince = (timestamp: Timestamp): number => {
  const milliseconds = timestamp.toMillis();
  const currentTime = Date.now();
  const timeDifference = currentTime - milliseconds;
  const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return Math.abs(daysSince);
};
