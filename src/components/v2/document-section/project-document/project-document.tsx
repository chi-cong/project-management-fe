import { handleFile, sessionStorageUtil } from "src/share/utils";
import { Typography, Button, Popconfirm, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetDocFileMutation,
  useDeleteProjectFileMutation,
  useGetUserDetailQuery,
} from "src/share/services";

import type { UploadProps } from "antd";
import { OUserRole, Project } from "src/share/models";
import { useRoleChecker } from "src/share/hooks";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const ProjectDocument = ({
  project,
  refetch,
}: {
  project?: Project;
  refetch: () => void;
}) => {
  const [getFile] = useGetDocFileMutation();
  const [deleteFile] = useDeleteProjectFileMutation();
  const checkRole = useRoleChecker();
  const { data: user } = useGetUserDetailQuery();
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${baseApi}upload/upload-file-for-project/${project?.project_id}`,
    headers: {
      authorization: sessionStorageUtil.get("accessToken")! as string,
    },
    beforeUpload(file) {
      const isPdf = file.name.slice(file.name.lastIndexOf(".")) === ".pdf";
      if (isPdf) {
        message.error("Sorry, PDF is not supported");
      }
      return !isPdf;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        refetch();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  const getLinks = () => {
    return project?.document!.map(async (file) => {
      return await getFile({ file }).unwrap();
    });
  };

  useEffect(() => {
    Promise.all(getLinks()).then((values) => setFileLinks(values));
  }, [project, getFile]);

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
                  {(!checkRole(OUserRole.Staff) ||
                    user?.user_id === project?.project_manager_id) && (
                    <Popconfirm
                      title='Delete this file ?'
                      onConfirm={() => {
                        // fileLinks and filenames index are the same
                        deleteFile({
                          filename: project?.document![index],
                          projectId: project?.project_id,
                        })
                          .unwrap()
                          .then(() => {
                            message.success(
                              `${project?.document![index]} is deleted`
                            );
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
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
      {(!checkRole(OUserRole.Staff) ||
        user?.user_id === project?.project_manager_id) && (
        <Upload.Dragger {...props} listType='text'>
          <strong>Choose a file</strong> or drag it here
        </Upload.Dragger>
      )}
    </div>
  );
};
