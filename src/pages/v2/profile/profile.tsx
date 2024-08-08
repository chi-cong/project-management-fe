import "./profile.css";
import { ProfileForm } from "src/layouts/v2/profile-form";
import { OUserRole, UserRole } from "src/share/models";
import { Dayjs } from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import { CustomAvatar } from "src/components/v2";
import { Card, Col, Row, Space } from "antd";
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
    <div className="user-profile-form">
        <div className="user-profile">
            <CustomAvatar size={350} userName={user.username} avatarSrc={user.avatar} className="user-profile-avatar"/>
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
            <img src="/src/assets/imgs/profile image.png" alt="Placeholder Avatar" className="img" style={{width:"30%", height:"100%"}}/>
            <div>
                <UploadOutlined className="upload-icon"/>
            </div>
            <div className="text-content" onClick={() =>{}}>
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
            <header>
                <h1 >
                    Profile
                </h1>
            </header>
            <div className="profile-container">
                <Row className="profile-content" gutter={[16, 8]} style={{ alignItems: 'stretch' }}>
                    <Col sm={24} md={10} lg={7} className="user-profile-container">
                        <Space direction="vertical" style={{ width: "100%", height: '100%' }}>
                            <Card className="card-box-shadow" style={{ height: '100%' }}>
                                <UserInfo user={user} />
                            </Card>
                            <Card className="card-box-shadow" style={{ height: '100%' }}>
                                <SelectNewAvatar />
                            </Card>
                        </Space>
                    </Col>
                    <Col sm={24} md={14} lg={17}>
                        <Card className="personal-information" style={{ height: '100%' }}>
                            <h2>Personal Information</h2>
                            <ProfileForm user={user} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};