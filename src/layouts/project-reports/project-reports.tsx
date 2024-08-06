import "./project-reports.css";
import { Timeline, Spin, Empty } from "antd";
import { useGetProjectReportsQuery } from "src/share/services";
import { useHandleReports } from "src/share/hooks";

interface ProjectReportProp {
  projectId?: string;
}

export const ProjectReports = ({ projectId }: ProjectReportProp) => {
  const { data, isFetching, isSuccess } = useGetProjectReportsQuery({
    projectId,
  });

  const returnedItem = useHandleReports("project", data);

  return (
    <Spin spinning={isFetching} size='large'>
      <div className='project-reports-container'>
        {isSuccess && data.tasks.length > 0 ? (
          <Timeline
            className='report-timeline'
            mode='left'
            items={returnedItem}
          />
        ) : (
          <Empty />
        )}
      </div>
    </Spin>
  );
};
