import "./activities.css";
import { Button, Input, List, message, Typography } from "antd";
import { useState } from "react";
import { CustomAvatar } from "src/components/v2";
import {
  useCreateActivityMutation,
  useGetTaskActivityQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import { useSelector } from "react-redux";
import { RootState } from "src/libs/redux";
import { Dayjs } from "dayjs";
import { utcToLocal } from "src/share/utils";

export const Activities = () => {
  const task = useSelector((state: RootState) => state.taskAssignment.task);

  const [actiDesc, setActiDesc] = useState<string>("");
  const [createActi] = useCreateActivityMutation();
  const { data: acties } = useGetTaskActivityQuery({
    items_per_page: "ALL",
    taskId: task?.task_id,
  });
  const { data: user } = useGetUserDetailQuery();

  return (
    <div className="acti-section">
      {/* create activities */}
      <Typography.Title level={4}>Activity</Typography.Title>
      <div className="acti-des-row">
        <CustomAvatar
          size={40}
          avatarSrc={user?.avatar}
          userName={user?.name}
          bgColor={user?.avatar_color}
        />
        <div className="acti-des-container">
          <Input.TextArea
            style={{
              resize: "none",
              height: "100px",
              width: "100%",
            }}
            variant="borderless"
            className="task-text-area"
            placeholder="New activity"
            value={actiDesc}
            onChange={(e) => {
              setActiDesc(e.target.value);
            }}
          />
          <Button
            type="primary"
            className="add-acti-btn"
            onClick={() => {
              if (actiDesc) {
                createActi({
                  task_id: task?.task_id,
                  description: actiDesc,
                })
                  .then(() => {
                    setActiDesc("");
                  })
                  .catch(() => message.error("Failed to create activity"));
              }
            }}
          >
            Send
          </Button>
        </div>
      </div>

      {/* activities list */}
      {acties && (
        <List
          style={{ width: "100%" }}
          dataSource={acties}
          renderItem={(activity) => (
            <List.Item className="activity-item">
              <List.Item.Meta
                className="activity-item-meta"
                avatar={
                  <CustomAvatar
                    userName={activity.user?.username}
                    size={40}
                    avatarSrc={activity.user?.avatar}
                    bgColor={activity.user?.avatar_color}
                  />
                }
                title={activity.user?.name}
                description={
                  <Typography.Paragraph style={{ opacity: "0.67" }}>
                    {activity.description}
                  </Typography.Paragraph>
                }
              />
              <Typography.Text
                className="activity-item-time"
                style={{ fontStyle: "italic", color: "var(--primary-color)" }}
              >
                {(utcToLocal(activity.createdAt) as Dayjs).fromNow()}
              </Typography.Text>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
