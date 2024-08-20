import "./project-card.css";
import {
  Typography,
  Button,
  Progress,
  Divider,
  Popconfirm,
  Popover,
  message,
} from "antd";
import { MenuDots, Pen, Trash } from "src/assets/icons";
import { OUserRole, type Project } from "src/share/models";
import { ModalUpdateProject } from "src/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import { Dayjs } from "dayjs";
import { localStorageUtil, shortenLongText, utcToLocal } from "src/share/utils";
import { useDeleteProjectMutation } from "src/share/services";

interface ProjectCardProp {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProp) => {
  const navigate = useNavigate();
  const checkRole = useRoleChecker();
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [popover, setPopover] = useState<boolean>(false);

  const [deleteProject] = useDeleteProjectMutation();

  const goToDetail = () => {
    if (!checkRole(OUserRole.Staff)) {
      navigate(
        `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/project/${project!.project_id!}`
      );
    }
  };

  const calculateProgress = (): number => {
    if (
      parseFloat(project.total_task!.total_task_is_done) === 0 ||
      parseFloat(project.total_task!.total_task_is_not_done)! === 0
    ) {
      return 0;
    }
    return Math.ceil(
      (parseFloat(project?.total_task!.total_task_is_done) /
        parseFloat(project?.total_task!.total_task_is_not_done)) *
        100
    );
  };

  const progressColor = (percent: number) => {
    if (percent <= 33) {
      return "#f5222d";
    }
    if (33 < percent && percent <= 66) {
      return "#ffc008";
    }
    if (66 < percent && percent <= 99) {
      return "#14A2B8";
    }
    return "#28A745";
  };

  const progress: number = calculateProgress();

  const ProjectCardOption = () => {
    return (
      <div className='project-option'>
        <Button
          type='text'
          className='project-option-btn'
          onClick={(e) => {
            e.stopPropagation();
            setUpdateModal(true);
            setPopover(false);
          }}
        >
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm
          title='Delete project ?'
          onConfirm={async (e) => {
            e?.stopPropagation();
            deleteProject({ projectId: project.project_id })
              .unwrap()
              .then(() => message.success("Project is deleted"))
              .catch(() => message.error("Failed to delete project"));
          }}
          onCancel={(e) => e?.stopPropagation()}
        >
          <Button
            className='project-option-btn'
            type='text'
            onClick={(e) => e.stopPropagation()}
          >
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <>
      <div className='project-card-v2' onClick={goToDetail}>
        <div className='project-card-head'>
          <Typography.Title level={4}>
            {shortenLongText(25, project?.name)}
          </Typography.Title>
          {!checkRole(OUserRole.Staff) && (
            <Popover content={ProjectCardOption}>
              <Button
                type='text'
                size='small'
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.stopPropagation();
                  setPopover(!popover);
                }}
              >
                <MenuDots />
              </Button>
            </Popover>
          )}
        </div>
        <div
          className='project-card-body'
          style={{ cursor: !checkRole(OUserRole.Staff) ? "pointer" : "none" }}
        >
          <Typography.Text>
            {shortenLongText(40, project.description)}
          </Typography.Text>
          <div className='progress-sec'>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor={progressColor(progress)}
            />
            <div className='progress-second-line'>
              <Typography.Text>progress</Typography.Text>
              <Typography.Text>{`${progress}%`}</Typography.Text>
            </div>
          </div>
        </div>
        <Divider />
        <div
          className='project-card-footer'
          style={{ cursor: !checkRole(OUserRole.Staff) ? "pointer" : "none" }}
        >
          <Typography.Text>
            {project?.endAt && (utcToLocal(project?.endAt) as Dayjs).fromNow()}
          </Typography.Text>
        </div>
      </div>
      <ModalUpdateProject
        isModalOpen={updateModal}
        setIsModalOpen={setUpdateModal}
        isUpdate={true}
        project={project}
      />
    </>
  );
};
