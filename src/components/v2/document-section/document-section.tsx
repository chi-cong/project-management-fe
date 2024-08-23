import "./document-section.css";
import { handleFile, sessionStorageUtil } from "src/share/utils";
import { Typography, Button, Popconfirm, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetDocFileMutation,
  useGetUserDetailQuery,
  useGetProjectTasksQuery,
} from "src/share/services";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "src/libs/redux";
import { useGetTaskQuery, useDeleteFileMutation } from "src/share/services";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";

import type { UploadProps } from "antd";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole, Project } from "src/share/models";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const DocumentSection = ({ project }: { project?: Project }) => {
  const taskAssignment = useSelector(
    (state: RootState) => state.taskAssignment
  );
  const dispatch = useDispatch();
  const checkRole = useRoleChecker();

  const { data: user } = useGetUserDetailQuery();
  const [getFile] = useGetDocFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const { data: task, refetch: refetchTask } = useGetTaskQuery(
    {
      taskId: taskAssignment.task?.task_id,
    },
    { skip: taskAssignment.task ? false : true }
  );
  const { refetch: tasksRefetch } = useGetProjectTasksQuery({
    projectId: project?.project_id,
    items_per_page: "ALL",
    page: 1,
  });

  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${baseApi}upload/upload-file-for-task/${taskAssignment.task?.task_id}`,
    headers: {
      authorization: sessionStorageUtil.get("accessToken")! as string,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        refetchTask();
        tasksRefetch();
        dispatch(
          selectTaskAssign({
            task: task,
            assignment: taskAssignment.assignment,
          })
        );
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  const getLinks = () => {
    setFileLinks([]);
    const tempFileLinks: string[] = [];

    return task?.document.map((file) =>
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
    setFileLinks([]);

    task?.document.map((file) =>
      getFile({ file })
        .unwrap()
        .then((link) => {
          setFileLinks((oldState) => [...oldState, link]);
        })
    );
  }, [task, getFile]);

  return (
    <div className='doc-sec'>
      <div className='doc-sec-first-part'>
        <div className='doc-sec-head'>
          <Typography.Title level={4}>File Attachment</Typography.Title>
        </div>
        <div className='file-list'>
          {fileLinks?.map((files, index) => {
            if (typeof files === "string") {
              const fileName = ` ${files.split("/").pop()?.substring(0, 30)}...`;
              const handledFile = handleFile(files);
              return (
                <div className='file-row' key={index}>
                  <div className='file-name-icon'>
                    {handledFile.fileIcon}
                    <Typography.Link>
                      <a href={files} target='_blank'>
                        {fileName}
                      </a>
                    </Typography.Link>
                  </div>
                  {!checkRole(OUserRole.Staff) ||
                    (user?.user_id === project?.project_manager_id && (
                      <Popconfirm
                        title='Delete this file ?'
                        onConfirm={() => {
                          // fileLinks and filenames index are the same
                          deleteFile({
                            filename: task?.document[index],
                            taskId: task?.task_id,
                          })
                            .unwrap()
                            .then(() => {
                              message.success(
                                `${task?.document[index]} is deleted`
                              );
                              getLinks();
                            })
                            .catch(() => {
                              message.error("Failed to delete file");
                            });
                        }}
                      >
                        <Button shape='round' danger size='small'>
                          Delete
                        </Button>
                      </Popconfirm>
                    ))}

                </div>
              );
            }
          })}
        </div>
      </div>
      {!checkRole(OUserRole.Staff) ||
      (checkRole(OUserRole.Staff) &&
        taskAssignment?.assignment?.user_id === user?.user_id) ||
      user?.user_id === project?.project_manager_id ? (
        <Upload.Dragger {...props} listType='text'>
          <strong>Choose a file</strong> or drag it here
        </Upload.Dragger>
      ) : null}
    </div>
  );
};
