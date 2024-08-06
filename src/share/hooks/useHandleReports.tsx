import dayjs from "dayjs";
import { ReactNode, useEffect, useState, useCallback } from "react";
import type { ProjectReportResp } from "src/share/models/projectModels";
import { Typography, Tag } from "antd";

import type { TimelineItemProps } from "antd";
import { User } from "src/share/models";
import React from "react";

interface PrepareReports {
  taskDesc?: string;
  projectCode?: string;
  date?: string;
  activities?: {
    activity_id?: string;
    description?: string;
    createdBy?: string;
    modifiedBy?: string;
    createdAt?: string;
    ActivityProperty?: {
      activity_property_id?: string;
      user_property_id?: string;
      activity_id?: string;
    };
    user_information?: User;
  }[];
}

export const useHandleReports = (
  type: "department" | "project",
  reports: ProjectReportResp | ProjectReportResp[] | undefined
) => {
  const [timelineItem, setTimelineItem] = useState<TimelineItemProps[]>([]);
  const { Text } = Typography;

  const handleReport = useCallback(() => {
    const newReportList: PrepareReports[] = [];
    if (type === "project" && reports) {
      (reports as ProjectReportResp).tasks.forEach((task) => {
        for (const date in task.activities) {
          const newReport: PrepareReports = {};
          newReport.taskDesc = task.description;
          newReport.date = date;
          (newReport.activities as unknown) = task.activities[date];
          newReportList.push(newReport);
        }
      });

      const sortedList = newReportList.sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
      );

      const finalTimeline: TimelineItemProps[] = [];
      let timeItem: TimelineItemProps = {};
      const tempTimeChildren: ReactNode[] = [];
      sortedList?.forEach((report, index) => {
        if (index === 0) {
          timeItem.label = report.date;
          timeItem.key = index;
        }
        if (index !== 0 && sortedList[index - 1].date !== report.date) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          tempTimeChildren.length = 0;
          finalTimeline.push(timeItem);
          timeItem = {};
          timeItem.label = report.date;
          timeItem.key = index;
        }
        tempTimeChildren.push(
          <div
            className='project-report-detail'
            style={{ wordBreak: "break-all", width: "600px" }}
            key={index}
          >
            <Text style={{ fontWeight: 700 }}>{report.taskDesc}</Text>
            {report.activities &&
              report.activities.map((activity, actiIndex) => {
                return (
                  <React.Fragment key={actiIndex}>
                    <br />
                    <span style={{ color: "#8c8c8c", fontWeight: 500 }}>
                      {`${activity.description}  `}{" "}
                      {activity.user_information &&
                        `- by ${activity.user_information.username}`}
                    </span>
                  </React.Fragment>
                );
              })}
          </div>
        );
        if (index === sortedList.length - 1) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          finalTimeline.push(timeItem);
        }
      });

      setTimelineItem(finalTimeline);
    }

    if (type === "department" && reports) {
      const finalTimeline: TimelineItemProps[] = [];

      (reports as ProjectReportResp[]).forEach((projectReport) => {
        projectReport.tasks.forEach((task) => {
          Object.entries(task.activities).forEach(([dateKey, value]) => {
            const newReport: PrepareReports = {};
            newReport.projectCode = projectReport.projectCode;
            newReport.taskDesc = task.description;
            newReport.date = dateKey;
            (newReport.activities as unknown) = value;
            newReportList.push(newReport);
          });
        });
      });
      const sortedList = newReportList.sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
      );

      let timeItem: TimelineItemProps = {};
      const tempTimeChildren: ReactNode[] = [];
      sortedList.forEach((report, index) => {
        if (index === 0) {
          timeItem.label = report.date;
          timeItem.key = index;
        } else if (index > 0 && sortedList[index - 1].date !== report.date) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          tempTimeChildren.length = 0;
          finalTimeline.push(timeItem);
          timeItem = {};
          timeItem.label = report.date;
          timeItem.key = index;
        }
        tempTimeChildren.push(
          <div className='project-report-detail' key={index}>
            {(index !== 0 &&
              sortedList[index - 1].projectCode !== report.projectCode) ||
            (index !== 0 &&
              sortedList[index - 1].projectCode === report.projectCode &&
              sortedList[index - 1].date !== report.date) ||
            index === 0 ? (
              <Tag>{report.projectCode}</Tag>
            ) : (
              ""
            )}
            <br />
            <Text style={{ fontWeight: 700 }}>{report.taskDesc}</Text>
            {report.activities &&
              report.activities.map((activity, actiIndex) => {
                return (
                  <React.Fragment key={actiIndex}>
                    <br />
                    <span style={{ color: "#8c8c8c", fontWeight: 500 }}>
                      {`${activity.description}  `}{" "}
                      {activity.user_information &&
                        `- by ${activity.user_information.username}`}
                    </span>
                  </React.Fragment>
                );
              })}
          </div>
        );

        if (index === sortedList.length - 1) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          finalTimeline.push(timeItem);
        }
      });
      setTimelineItem(finalTimeline);
    }
  }, [reports, type]);

  useEffect(() => {
    handleReport();
  }, [handleReport, reports]);

  return timelineItem;
};
