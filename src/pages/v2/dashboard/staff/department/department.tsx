import "./department.css";
import { Typography, Card, Modal, Button, List, Empty } from "antd";
import { ResponsivePie } from "@nivo/pie";
import { CustomAvatar } from "src/components/v2";
import { DepartmentProjects } from "src/layouts/v2";
import { useEffect, useState } from "react";
import { DepartmentReport } from "src/layouts/v2/department-report";
import { PieChart } from "src/assets/icons";
import {
  useGetDepartmentQuery,
  useGetAllProjectDepartmentQuery,
  useManagerGetAllStaffDepartmentQuery,
} from "src/share/services";
import { Project, RoleResponse } from "src/share/models";
import { TeamOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";

export const StaffDepartment = () => {
  const { id: departmentId } = useParams();

  const [reportModal, setReportModal] = useState<boolean>(false);
  const [isTeamOpened, setIsTeamOpened] = useState<boolean>(false);
  const { data } = useGetDepartmentQuery(
    { id: departmentId! },
    { skip: departmentId === "null" }
  );
  const { data: departmentProjects } = useGetAllProjectDepartmentQuery(
    {
      departmentId,
    },
    { skip: departmentId === "null" }
  );
  const { data: departmentStaffs } = useManagerGetAllStaffDepartmentQuery(
    {
      items_per_page: "ALL",
    },
    { skip: departmentId === "null" }
  );
  const [projectFilter, setProjectFilter] = useState<{
    onProgress: Project[];
    todo: Project[];
    done: Project[];
  }>({ done: [], onProgress: [], todo: [] });

  const calculateProgress = (information: {
    total_task_is_done: string;
    total_task_is_not_done: string;
  }): number => {
    return Math.ceil(
      (parseInt(information.total_task_is_done) /
        parseInt(information.total_task_is_not_done)) *
        100
    );
  };

  useEffect(() => {
    const setupProjectFilter = (): void => {
      const onProgress: Project[] = [];
      const todo: Project[] = [];
      const done: Project[] = [];

      departmentProjects?.data.forEach((project) => {
        const status = calculateProgress(project.total_task!);
        if (status === 100) {
          done.push(project);
        } else if (status === 0) {
          todo.push(project);
        } else {
          onProgress.push(project);
        }
      });

      setProjectFilter({ onProgress, todo, done });
    };

    setupProjectFilter();
  }, [departmentProjects]);

  return departmentId !== "null" ? (
    <>
      <div className='department-page'>
        <section className='main'>
          <header className='main-header'>
            <div className='title-row'>
              <h2>{data?.name}</h2>
              <div style={{ display: "flex" }}>
                <Button
                  shape='round'
                  style={{ display: "" }}
                  onClick={() => setIsTeamOpened(true)}
                  className='open-team-member-modal-btn'
                >
                  <TeamOutlined />
                  Team members
                </Button>
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
            </div>
            <section className='second-sec'>
              <div className='des-manager-sec'>
                <Typography.Text>{data?.description}</Typography.Text>
                {data?.information?.manager ? (
                  <Card className='manager-card'>
                    <Card.Meta
                      title={data.information.manager?.name}
                      description={
                        <div className='department-manager-card-des'>
                          <Typography.Text>
                            {data.information.manager?.email}
                          </Typography.Text>
                          <Typography.Text type='secondary'>
                            Department Manager
                          </Typography.Text>
                        </div>
                      }
                      avatar={
                        <CustomAvatar
                          size={60}
                          userName={data.information.manager?.name}
                          avatarSrc={data.information.manager?.avatar}
                          bgColor={data.information.manager?.avatar_color}
                        />
                      }
                    />
                  </Card>
                ) : (
                  <Empty description='No Manager' />
                )}
              </div>

              <div className='pie-chart'>
                <ResponsivePie
                  data={[
                    {
                      id: "todo",
                      title: "Todo",
                      color: "#1677ff",
                      value: projectFilter.todo.length,
                    },
                    {
                      id: "on progress",
                      title: "On progress",
                      color: "#1677ff",
                      value: projectFilter.onProgress.length,
                    },
                    {
                      id: "done",
                      title: "Done",
                      color: "#h1h1h1",
                      value: projectFilter.done.length,
                    },
                  ]}
                  margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: "pastel2" }}
                  activeOuterRadiusOffset={0}
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
            <DepartmentProjects title='Todo' projects={projectFilter.todo} />
            <DepartmentProjects
              title='On Progress'
              projects={projectFilter.onProgress}
            />
            <DepartmentProjects title='Done' projects={projectFilter.done} />
          </section>
        </section>
        <section className='team-member-sec'>
          <div className='member-list-container'>
            <div className='title'>
              <Typography.Title level={5}>Team Members</Typography.Title>
            </div>
            <List
              className='memeber-list'
              dataSource={departmentStaffs?.users}
              renderItem={(user) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={user?.name || user.username}
                      description={(user?.role as RoleResponse).name}
                      avatar={
                        <CustomAvatar
                          size={60}
                          userName={user.username}
                          avatarSrc={user.avatar}
                          bgColor={user.avatar_color}
                        />
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
        style={{ minWidth: "95vw" }}
      >
        <DepartmentReport departmentId={departmentId} />
      </Modal>
      <Modal
        title={"Team Members"}
        className='department-team-member-modal'
        open={isTeamOpened}
        onCancel={() => setIsTeamOpened(false)}
        footer={[]}
      >
        <div className='member-list-container'>
          <List
            className='memeber-list'
            dataSource={departmentStaffs?.users}
            renderItem={(user) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    title={user?.name || user.username}
                    description={(user?.role as RoleResponse).name}
                    avatar={
                      <CustomAvatar
                        size={60}
                        userName={user.username}
                        avatarSrc={user.avatar}
                        bgColor={user.avatar_color}
                      />
                    }
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </Modal>
    </>
  ) : (
    <Empty description='You have no department' />
  );
};
