import "./department.css";
import {
  Typography,
  Card,
  Modal,
  Button,
  Popconfirm,
  Popover,
  List,
} from "antd";
import { ResponsivePie } from "@nivo/pie";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CustomAvatar } from "src/components/v2";
import { DepartmentProjects } from "src/layouts/v2";
import { useState } from "react";
import { DepartmentReport } from "src/layouts/v2/department-report";
import { Pen, Trash, MenuDots, PieChart, UserPlus } from "src/assets/icons";
import { useNavigate } from "react-router-dom";

export const AdminDepartment = () => {
  const [reportModal, setReportModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const DepartmentOptions = () => {
    return (
      <div className='department-option'>
        <Button type='text' className='department-option-btn'>
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete this department ?'>
          <Button className='department-option-btn' type='text'>
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };
  const TeamMemberOptions = () => {
    return (
      <div className='department-option'>
        <Button type='text' className='department-option-btn'>
          <UserPlus />
          <Typography.Text>Add Member </Typography.Text>
        </Button>
        <Button className='department-option-btn' type='text'>
          <Trash />
          <Typography.Text>Remove Member</Typography.Text>
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className='department-page'>
        <section className='main'>
          <header className='main-header'>
            <div className='title-row'>
              <Typography.Title level={2}>Deparment Detail</Typography.Title>
              <div style={{ display: "flex" }}>
                <Popover content={<DepartmentOptions />}>
                  <Button type='text' className='title-row-btn' size='small'>
                    <MenuDots />
                  </Button>
                </Popover>
                <Button
                  type='default'
                  className='title-row-btn'
                  shape='round'
                  onClick={() => setReportModal(true)}
                >
                  <PieChart />
                  Reports
                </Button>
              </div>
              <Button
                shape='round'
                style={{ display: "" }}
                onClick={() => navigate("/v2/dashboard/admin/departments")}
              >
                <ArrowLeftOutlined />
                Back to department
              </Button>
            </div>
            <section className='second-sec'>
              <div className='des-manager-sec'>
                <Typography.Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nobis ipsam, aperiam ipsum delectus dolores iste.
                </Typography.Text>
                <Card className='manager-card'>
                  <Card.Meta
                    title={"Nguyen Van A"}
                    description={
                      <div className='department-manager-card-des'>
                        <Typography.Text>nguyenvana@gmail.com</Typography.Text>
                        <Typography.Text type='secondary'>
                          Department Manager
                        </Typography.Text>
                      </div>
                    }
                    avatar={<CustomAvatar size={60} userName='Nguyen Van A' />}
                  />
                </Card>
              </div>

              <div className='pie-chart'>
                <ResponsivePie
                  data={[
                    { id: "todo", title: "Todo", color: "#1677ff", value: 100 },
                    {
                      id: "on progress",
                      title: "On progress",
                      color: "#1677ff",
                      value: 100,
                    },
                    {
                      id: "done",
                      title: "Done",
                      color: "#h1h1h1",
                      value: 100,
                    },
                  ]}
                  margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  enableArcLinkLabels={false}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateX: 0,
                      translateY: 10,
                      itemsSpacing: 0,
                      itemWidth: 0,
                      itemHeight: 0,
                      itemTextColor: "#999",
                      itemDirection: "left-to-right",
                      itemOpacity: 0,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </section>
          </header>
          <section className='project-section'>
            <DepartmentProjects title='On Progress' />
            <DepartmentProjects title='Done' />
            <DepartmentProjects title='Todo' />
          </section>
        </section>
        <section className='team-member-sec'>
          <div className='member-list-container'>
            <div className='title'>
              <Typography.Title level={5}>Team Members</Typography.Title>
              <Popover content={<TeamMemberOptions />}>
                <Button type='text' size='small'>
                  <MenuDots />
                </Button>
              </Popover>
            </div>
            <List
              className='memeber-list'
              dataSource={[1, 2, 3]}
              renderItem={() => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={"Nguyen Van A"}
                      description={"Staff"}
                      avatar={
                        <CustomAvatar size={60} userName='Nguyen Van A' />
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        </section>
      </div>
      <Modal
        open={reportModal}
        onCancel={() => setReportModal(false)}
        footer={[]}
        title='Department Report'
        width={"80%"}
      >
        <DepartmentReport />
      </Modal>
    </>
  );
};
