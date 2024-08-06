import "./user-card.css";
import { Card, Avatar } from "antd";
import { randAvaBg } from "src/share/utils";

interface UserCardProps {
  username?: string;
  email?: string;
  avatar?: string;
  onClick?: () => void;
}

export const UserCard = ({
  username,
  email,
  avatar,
  onClick,
}: UserCardProps) => {
  const { Meta } = Card;
  return (
    <Card hoverable className='user-card' onClick={onClick}>
      <Meta
        avatar={
          <Avatar
            size={64}
            {...(avatar
              ? { src: avatar }
              : { style: { background: randAvaBg(), fontSize: 32 } })}
          >
            {!avatar && username?.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        title={username}
        description={email}
      />
    </Card>
  );
};
