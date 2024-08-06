import "./activity-items.css";
import { List, Input, Popover, message, Space, Button, Avatar } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useRoleChecker } from "src/share/hooks";
import { Activity, OUserRole } from "src/share/models";
import {
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} from "src/share/services";
import { randAvaBg } from "src/share/utils";

interface ActiItemProp {
  activity: Activity;
  uid: string | undefined;
}

export const ActivityItem = ({ activity, uid }: ActiItemProp) => {
  const [editActi, setEditActi] = useState<boolean>(false);
  const [actiDesc, setActiDesc] = useState<string>(activity.description || "");

  const checkRole = useRoleChecker();

  const [deleteActivity] = useDeleteActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  return (
    <>
      {editActi ? (
        <Space.Compact style={{ width: "100%" }}>
          <Input
            className='update-acti-input'
            value={actiDesc}
            onChange={(e) => {
              setActiDesc(e.currentTarget.value);
            }}
            onPressEnter={(e) => {
              e.preventDefault();
            }}
          />
          <Button
            type='primary'
            onClick={async (e) => {
              e.preventDefault();
              if (actiDesc) {
                await updateActivity({
                  value: { description: actiDesc },
                  activityId: activity.activity_id,
                })
                  .then(() => {
                    message.success("Activity's updated");
                  })
                  .catch(() => message.error("Failed to update activity"));
                setEditActi(false);
              }
            }}
          >
            <SaveOutlined />
          </Button>
          <Button onClick={() => setEditActi(false)}>
            <CloseCircleOutlined />
          </Button>
        </Space.Compact>
      ) : (
        <List.Item
          actions={
            checkRole(OUserRole.Admin) || uid === activity.user?.user_id
              ? [
                  <Popover content={"Edit"}>
                    <EditOutlined
                      className='edit-acti-btn'
                      onClick={() => {
                        setEditActi(true);
                      }}
                    />
                  </Popover>,
                  <Popover content={"Delete"}>
                    <DeleteOutlined
                      className='delete-acti-btn'
                      onClick={() => {
                        deleteActivity({
                          activityId: activity.activity_id,
                        })
                          .unwrap()
                          .then(() =>
                            message.success("Successfully delete activity")
                          )
                          .catch(() =>
                            message.error("Failed to delete activity")
                          );
                      }}
                    />
                  </Popover>,
                ]
              : [
                  <Popover content={"Edit"}>
                    <EditOutlined
                      className='edit-acti-btn'
                      onClick={() => {
                        setEditActi(true);
                      }}
                    />
                  </Popover>,
                ]
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar
                {...(activity.user?.avatar
                  ? { src: activity.user.avatar }
                  : { style: { background: randAvaBg() } })}
              >
                {!activity.user?.avatar &&
                  activity.user?.username?.substring(0, 1).toLocaleUpperCase()}
              </Avatar>
            }
            title={<div className='acti-des'>{activity.description}</div>}
            description={`${activity.createdAt?.substring(0, 10)} by ${activity.user?.username}`}
          />
        </List.Item>
      )}
    </>
  );
};
