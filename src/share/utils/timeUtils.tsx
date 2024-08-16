import dayjs, { Dayjs } from "dayjs";

export const utcToLocal = (utcTime: string | Dayjs) => {
  return dayjs(utcTime)
    .utc()
    .tz("Asia/Ho_Chi_Minh")
    .format("ddd, MMM D, H:mm z");
};
