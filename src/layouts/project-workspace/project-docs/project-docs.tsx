import "./project-docs.css";
import { List, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { localStorageUtil } from "src/share/utils";
import { useGetDocFileMutation } from "src/share/services";
import { useEffect, useState } from "react";

import type { UploadProps } from "antd";
import type { Project } from "src/share/models";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const ProjectDocs = ({ project }: { project?: Project }) => {
  const [getFile] = useGetDocFileMutation();
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const getLinks = () => {
    setFileLinks([]);
    const tempFileLinks: string[] = [];
    return project?.document?.map((file) =>
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
    if (project) {
      getLinks();
    }
  }, [project]);

  const uploadProps: UploadProps = {
    action: `${baseApi}upload/upload-file-for-project/${project?.project_id}`,
    headers: {
      authorization: localStorageUtil.get("accessToken")!,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`file too large or bad internet`);
      }
    },
  };

  return (
    <div className='project-docs-sec'>
      <p className='project-section-title'>Documents</p>
      <List
        dataSource={
          project !== undefined && project.document!.length >= 1
            ? fileLinks
            : []
        }
        renderItem={(link) => {
          return (
            <List.Item>
              <a href={link}>{link}</a>
            </List.Item>
          );
        }}
      />
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload new document</Button>
      </Upload>
    </div>
  );
};
