import dayjs, { Dayjs } from "dayjs";

export const utcToLocal = (utcTime?: string | Dayjs): Dayjs | undefined => {
  if (utcTime) {
    return dayjs(utcTime).utc().tz("Asia/Ho_Chi_Minh");
  }
  return undefined;
};
