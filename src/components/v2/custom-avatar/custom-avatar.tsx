import { Avatar } from "antd";
import { useState } from "react";
import { randAvaBg } from "src/share/utils";

interface AvatarProp {
  size: number;
  avatarSrc?: string;
  userName?: string;
}

export const CustomAvatar = ({ size, avatarSrc, userName }: AvatarProp) => {
  const [bgColor] = useState<"#f56a00" | "#87d068" | "#1677ff" | undefined>(
    randAvaBg()
  );
  return (
    <Avatar
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: !avatarSrc ? bgColor : "none",
        fontSize: `${size / 2}px`,
      }}
      src={avatarSrc || ""}
    >
      {userName && userName.substring(0, 1).toLocaleUpperCase()}
    </Avatar>
  );
};
