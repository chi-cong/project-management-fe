import { Empty, Spin, Timeline } from "antd";
import { useGetProjectReportsQuery } from "src/share/services/";
import { useHandleReports } from "src/share/hooks";

export const ProjectReport = ({ projectId }: { projectId?: string }) => {
  const { data: reportData, isFetching } = useGetProjectReportsQuery({
    projectId,
  });

  const reportTimelineItem = useHandleReports("project", reportData);

  return (
    <>
      <Spin spinning={isFetching}>
        {reportTimelineItem && reportTimelineItem.length > 0 ? (
          <div className='time-line-report-department'>
            <Timeline mode={"alternate"} items={reportTimelineItem} />
          </div>
        ) : (
          <Empty />
        )}
      </Spin>
    </>
  );
};
