import { handleFile, sessionStorageUtil } from "src/share/utils";
import { Typography, Button, Popconfirm, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { Folder } from "src/assets/icons";
import {
  useGetDocFileMutation,
  useGetProjectQuery,
  useDeleteProjectFileMutation,
} from "src/share/services";

import type { UploadProps } from "antd";
import { Project } from "src/share/models";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const ProjectDocument = ({ project }: { project?: Project }) => {
  const [getFile] = useGetDocFileMutation();
  const [deleteFile] = useDeleteProjectFileMutation();
  const { refetch: refetchProject } = useGetProjectQuery({
    projectId: project?.project_id || "",
  });

  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${baseApi}upload/upload-file-for-project/${project?.project_id}`,
    headers: {
      authorization: sessionStorageUtil.get("accessToken")! as string,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        refetchProject();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {},
  };

  const getLinks = () => {
    setFileLinks([]);
    const tempFileLinks: string[] = [];
    return project?.document!.map((file) =>
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
    const tempFileLinks: string[] = [];
    project?.document!.map((file) =>
      getFile({ file })
        .unwrap()
        .then((link) => {
          tempFileLinks.push(link);
        })
        .then(() => {
          setFileLinks(tempFileLinks);
        })
    );
  }, [getFile, project]);

  return (
    <div className='doc-sec'>
      <div className='doc-sec-first-part'>
        <div className='doc-sec-head'>
          <Folder />
          <Typography.Title level={4}>File Attachment</Typography.Title>
        </div>

        <div className='file-list'>
          {fileLinks.map((files, index) => {
            const handledFile = handleFile(files);
            return (
              <div className='file-row' key={index}>
                <div className='file-name-icon'>
                  {handledFile.fileIcon}
                  <Typography.Link>
                    <a href={files} target='_blank'>
                      {handledFile.displayedFileName}
                    </a>
                  </Typography.Link>
                </div>
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
                          `${project!.document![index]} is deleted`
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
              </div>
            );
          })}
        </div>
      </div>
      <Upload.Dragger
        {...props}
        listType='text'
        // showUploadList={uploadProgress}
      >
        <strong>Choose a file</strong> or drag it here
      </Upload.Dragger>
    </div>
  );
};
