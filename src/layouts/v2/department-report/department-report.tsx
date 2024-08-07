import { Empty, Spin, Timeline } from "antd";
import { useGetReportDepartmentsQuery } from "src/share/services/departmentServices";
import { useHandleReports } from "src/share/hooks";

export const DepartmentReport = ({
  department_id,
}: {
  department_id?: string;
}) => {
  const { data: reportData, isFetching } = useGetReportDepartmentsQuery({
    departmentId: "66aa0782193b7aa0827eace0",
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
