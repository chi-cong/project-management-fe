import React from "react";
import { Avatar, Card, Col, Progress, Row } from "antd";
import "./my-card-project.css";
import { useGetProjectStaffsQuery } from "src/share/services";
import { Project } from "src/share/models";
import { CustomAvatar } from "src/components/v2";
import { shortenLongText, utcToLocal } from "src/share/utils";
import { Dayjs } from "dayjs";

type CardProject = {
  name?: string;
  description?: string;
  onClick?: () => void;
  role?: string;
  project?: Project;
};

export const MyCardProject: React.FC<CardProject> = ({
  name,
  description,
  onClick,
  project,
}) => {
  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: project?.project_id,
  });

  const calculateProgress = (): number => {
    if (project) {
      return Math.ceil(
        (parseInt(project.total_task!.total_task_is_done) /
          parseInt(project.total_task!.total_task_is_not_done)) *
          100
      );
    }
    return 0;
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

  return (
    <>
      <div className='card-project-container' onClick={onClick}>
        <Card hoverable bordered={false} className='card-Project'>
          <div className='project-wrapper'>
            <Row className='project-header'>
              {/* title */}
              <Col span={12} className='project-header-info'>
                <h3 className='project-name'>{shortenLongText(30, name)}</h3>
              </Col>
            </Row>
            <div className='project-body'>
              {/* info */}
              <div className='project-body-info'>
                <span>{shortenLongText(40, description)}</span>
                {/* progress */}
                <div className='project-progress'>
                  <Progress
                    percent={progress}
                    status='active'
                    strokeColor={progressColor(progress)}
                  />
                </div>
              </div>
            </div>
            <div className='project-footer'>
              <div className='project-footer-info'>
                <span>
                  {project?.endAt &&
                    (utcToLocal(project.endAt) as Dayjs).fromNow()}
                </span>
              </div>
              <div className='project-footer-action'>
                <div className='avatat-group-wrapper'>
                  {projectStaffs?.users.length ? (
                    <Avatar.Group
                      maxCount={2}
                      maxPopoverTrigger='hover'
                      size='small'
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                    >
                      {projectStaffs?.users.map((staff, index) => {
                        return (
                          <CustomAvatar
                            avatarSrc={staff.avatar}
                            size={40}
                            userName={staff.name}
                            bgColor={staff.avatar_color}
                            key={index}
                          />
                        );
                      })}
                    </Avatar.Group>
                  ) : (
                    <CustomAvatar size={40} userName='+' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
