import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const V2 = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
