import { Avatar } from "antd";
import { CSSProperties, useState } from "react";
import { randAvaBg } from "src/share/utils";

interface AvatarProp {
  size: number;
  avatarSrc?: string;
  userName?: string;
  className?: string;
  style?: CSSProperties;
}

export const CustomAvatar = ({
  size,
  avatarSrc,
  userName,
  className,
  style,
}: AvatarProp) => {
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
        ...style,
      }}
      className={className}
      src={avatarSrc || ""}
    >
      {userName && userName.substring(0, 1).toLocaleUpperCase()}
    </Avatar>
  );
};
