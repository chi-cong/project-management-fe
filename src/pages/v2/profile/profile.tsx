import { Headbar, Sidebar } from "src/components/v2";
import "./profile.css";
import { ProfileForm } from "src/layouts/v2/profile-form";
import { OUserRole, UserRole } from "src/share/models";
import { Dayjs } from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import { CustomAvatar } from "src/components/v2";
interface User {
    avatar: string | undefined;
    user_id?: string;
    username?: string;
    name: string;
    email: string;
    phone: string;
    birthday?: string | Dayjs;
    role?: UserRole;
  }

  const UserInfo: React.FC<{ user: User }> = ({ user }) => (
    <div className="user-info-form">
        <div className="user-info">
            <CustomAvatar size={350} userName={user.username} avatarSrc={user.avatar} />
            <div className="user-details">
                <h3>{user.name}</h3>
                <span className="role-label">{user.role}</span>
                <p>{user.email}</p>
            </div>
        </div>
    </div>
);

const SelectNewAvatar: React.FC = () => (
    <div className="select-new-avatar-form">
        <h3>Select new avatar</h3>
        <div className="avatar-upload">
            <img src="/src/assets/imgs/loginbg.jpg" alt="Placeholder Avatar" className="img"/>
            <div>
                <UploadOutlined className="upload-icon"/>
            </div>
            <div className="text-content">
                <p style={{fontWeight: "bolder"}}>Choose new file</p>
                <p>JPG, PNG, WEBP, JEPG,... Max size of 800GB</p>
            </div>
        </div>
    </div>
);

export const Profile = () => {
    const user = {
        user_id: "1",
        username: "nguyenvana",
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        phone: "0903412345",
        birthday: "1996-05-24",
        role: OUserRole.Admin,
        avatar: "/src/assets/imgs/loginbg.jpg"
    };
    return(
        <div className='v2-profile-page'>
            <Headbar />
            <div className="profile-container">
                <Sidebar />
                <div className="profile-content">
                    <div className="user-info-container">
                        <UserInfo user={user} />
                        <SelectNewAvatar />
                    </div>
                    <div className="personal-information"> 
                        <h2>Personal Information</h2>
                        <ProfileForm user={user}/>
                    </div>
                </div>
            </div>
        </div>
    );
};