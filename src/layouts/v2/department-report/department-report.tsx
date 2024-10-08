import { Empty, Spin, Timeline } from "antd";
import { useGetReportDepartmentsQuery } from "src/share/services/departmentServices";
import { useHandleReports } from "src/share/hooks";

export const DepartmentReport = ({
  departmentId,
}: {
  departmentId?: string;
}) => {
  const { data: reportData, isFetching } = useGetReportDepartmentsQuery({
    departmentId,
  });

  const reportTimelineItem = useHandleReports("department", reportData);

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
