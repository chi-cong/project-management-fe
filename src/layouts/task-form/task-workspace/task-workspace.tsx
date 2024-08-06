import "./task-workspace.css";
import { Button, Input, List, Upload, message, Typography } from "antd";
import { UploadOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  useCreateActivityMutation,
  useGetTaskActivityQuery,
  useGetDocFileMutation,
  useGetUserDetailQuery,
} from "src/share/services";

import { ActivityItem } from "./activity-item";
import { type Task } from "src/share/models";
import { UploadProps } from "antd";
import { localStorageUtil } from "src/share/utils";
import { useEffect, useState } from "react";

interface WorkspaceProps {
  task: Task;
}
const { Title } = Typography;
const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const TaskWorkspace = ({ task }: WorkspaceProps) => {
  const [fileLinks, setFileLinks] = useState<string[]>([]);
  const [actiDesc, setActiDesc] = useState<string>("");

  const uploadProps: UploadProps = {
    action: `${baseApi}upload/upload-file-for-task/${task?.task_id}`,
    headers: {
      authorization: localStorageUtil.get("accessToken")!,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`file is too large or bad connection`);
      }
    },
  };

  const { data: userDetail } = useGetUserDetailQuery();
  const [getFile] = useGetDocFileMutation();
  const [createActivity] = useCreateActivityMutation();
  const { data: activityData } = useGetTaskActivityQuery({
    taskId: task?.task_id,
    items_per_page: "ALL",
  });

  const getLinks = () => {
    setFileLinks([]);
    const tempFileLinks: string[] = [];
    return task?.document?.map((file) =>
      getFile({ file })
        .unwrap()
        .then((link) => {
          tempFileLinks.push(link);
        })
        .then(() => {
          setFileLinks(tempFileLinks);
        })
    );
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload new Document</Button>
      </Upload>
      {fileLinks.length > 0 && (
        <List
          dataSource={
            task !== undefined && task.document!.length >= 1 ? fileLinks : []
          }
          renderItem={(link) => {
            return (
              <List.Item>
                <a href={link}>{link}</a>
              </List.Item>
            );
          }}
        />
      )}
      <div className='acti-container'>
        <Title level={5}>Activites</Title>
        <Input.TextArea
          style={{ resize: "none", height: "100px" }}
          className='task-text-area'
          placeholder='New activity'
          value={actiDesc}
          onChange={(e) => {
            setActiDesc(e.target.value);
          }}
        />
        <div className='new-acti-btn-sec'>
          <Button
            type='primary'
            onClick={() => {
              if (actiDesc) {
                createActivity({
                  description: actiDesc,
                  task_id: task?.task_id,
                })
                  .unwrap()
                  .then(() => message.success("New activity is created"))
                  .catch(() => message.error("Failed to create activity"));
                
              }
            }}
          >
            <ArrowRightOutlined />
          </Button>
        </div>
        {activityData && (
          <List
            style={{ width: "100%" }}
            dataSource={activityData ? activityData : []}
            renderItem={(activity) => (
              <ActivityItem activity={activity} uid={userDetail?.user_id} />
            )}
          />
        )}
      </div>
    </>
  );
};
