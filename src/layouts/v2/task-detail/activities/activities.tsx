import "./activities.css";
import { Button, Input, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { CustomAvatar } from "src/components/v2";
import {
  useCreateActivityMutation,
  useGetTaskActivityQuery,
} from "src/share/services";
import { useSelector } from "react-redux";
import { RootState } from "src/libs/redux";
import dayjs from "dayjs";

export const Activities = () => {
  const task = useSelector((state: RootState) => state.taskAssignment.task);

  const [actiDesc, setActiDesc] = useState<string>("");
  const [createActi] = useCreateActivityMutation();
  const { data: acties } = useGetTaskActivityQuery({
    items_per_page: "ALL",
    taskId: task?.task_id,
  });

  useEffect(() => {});

  return (
    <div className='acti-section'>
      {/* create activities */}
      <Typography.Title level={4}>Activity</Typography.Title>
      <div className='acti-des-row'>
        <CustomAvatar size={40} userName='Nguyen Van A' />
        <div className='acti-des-container'>
          <Input.TextArea
            style={{ resize: "none", height: "100px", width: "100%" }}
            className='task-text-area'
            placeholder='New activity'
            value={actiDesc}
            onChange={(e) => {
              setActiDesc(e.target.value);
            }}
          />
          <Button
            type='primary'
            className='add-acti-btn'
            onClick={() => {
              if (actiDesc) {
                createActi({
                  task_id: task?.task_id,
                  description: actiDesc,
                }).catch(() => message.error("Failed to create activity"));
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
            <List.Item>
              <List.Item.Meta
                avatar={
                  <CustomAvatar userName={activity.user?.username} size={40} />
                }
                title={activity.user?.name}
                description={
                  <Typography.Paragraph>
                    {activity.description}
                  </Typography.Paragraph>
                }
              />
              <Typography.Text>
                {dayjs(activity.createdAt?.substring(0, 10)).fromNow()}
              </Typography.Text>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
