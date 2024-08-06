import { Dayjs } from "dayjs";
import type { User, UserRole } from "src/share/models";

export interface UserInfoType {
  user_id?: string;
  username?: string;
  password?: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string | Dayjs;
  role?: UserRole;
}

export interface UserFormProp {
  initValues?: UserInfoType | User;
  setOpenAcountTab?: (isOpen: boolean) => void;
  action: "create" | "detail" | "update";
}
