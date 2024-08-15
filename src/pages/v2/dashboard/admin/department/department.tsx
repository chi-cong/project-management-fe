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
import { CustomAvatar, RmDepartmentStaff } from "src/components/v2";
import { DepartmentProjects } from "src/layouts/v2";
import { useEffect, useState } from "react";
import { DepartmentReport } from "src/layouts/v2/department-report";
import { Pen, Trash, MenuDots, PieChart, UserPlus } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetDepartmentQuery,
  useGetAllProjectDepartmentQuery,
  useGetDepartmentStaffsQuery,
  useDeleteDepartmentsMutation,
} from "src/share/services";
import { Project, RoleResponse } from "src/share/models";
import { ModalUpdateDepartment } from "src/components";
import AddStaffTabs from "src/components/modal-update-department/add-staff-tabs";

import { useParams } from "react-router-dom";

export const AdminDepartment = () => {
  const { id: departmentId } = useParams();

  const [reportModal, setReportModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [addStaffModal, setAddStaffModal] = useState<boolean>(false);
  const [rmStaffModal, setRmStaffModal] = useState<boolean>(false);
  const { data } = useGetDepartmentQuery({ id: departmentId! });
  const { data: departmentProjects } = useGetAllProjectDepartmentQuery({
    departmentId,
  });
  const { data: departmentStaffs } = useGetDepartmentStaffsQuery({
    itemsPerPage: "ALL",
    departmentId,
  });
  const [deleteDepartment] = useDeleteDepartmentsMutation();
  const navigate = useNavigate();
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

  const DepartmentOptions = () => {
    return (
      <div className='department-option'>
        <Button
          type='text'
          className='department-option-btn'
          onClick={() => setUpdateModal(true)}
        >
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm
          title='Delete this department ?'
          onConfirm={() => {
            deleteDepartment({ departmentId });
            navigate("/v2/department");
          }}
        >
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
        <Button
          type='text'
          className='department-option-btn'
          onClick={() => setAddStaffModal(true)}
        >
          <UserPlus />
          <Typography.Text>Add Member </Typography.Text>
        </Button>
        <Button
          className='department-option-btn'
          type='text'
          onClick={() => setRmStaffModal(true)}
        >
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
              <h2>{data?.name}</h2>
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
                <Typography.Text>{data?.description}</Typography.Text>
                {data?.information && (
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
                          bgColor={data.information.manager?.avatarColor}
                        />
                      }
                    />
                  </Card>
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
              <Popover content={<TeamMemberOptions />}>
                <Button type='text' size='small'>
                  <MenuDots />
                </Button>
              </Popover>
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
                          bgColor={user.avatarColor}
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
      >
        <DepartmentReport departmentId={departmentId} />
      </Modal>
      <ModalUpdateDepartment
        isModalOpen={updateModal}
        setIsModalOpen={setUpdateModal}
        department={data}
      />
      <Modal
        open={addStaffModal}
        onCancel={() => setAddStaffModal(false)}
        width={"80vw"}
      >
        <AddStaffTabs id={departmentId} />
      </Modal>
      <Modal
        open={rmStaffModal}
        onCancel={() => setRmStaffModal(false)}
        width={"80vw"}
      >
        <RmDepartmentStaff departmentId={departmentId} />
      </Modal>
    </>
  );
};
