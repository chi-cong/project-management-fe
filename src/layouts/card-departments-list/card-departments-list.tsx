import "./card-departments-list.css";
import { useEffect, useState } from "react";
import { List, Spin, Empty } from "antd";
import { ModalDepartments } from "src/layouts/modal-departments";
import { CardDepartmentss } from "src/components/card-departments";
import { ModalAddDepartment } from "../modal-departments/modal-add-department";
import { MngPageHeader } from "src/layouts";
import {
  useGetDepartmentsQuery,
  useGetDetailDepartmentQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import { Department, OUserRole, RoleResponse } from "src/share/models";

import { useRoleChecker } from "src/share/hooks";
import { UserDepartmentUi } from "src/layouts/user-department-ui/user-department-ui";
import type { PaginationProps } from "antd";

export const CardDepartments = () => {
  const [visible, setVisible] = useState(false);
  const [queries, setQueries] = useState<{
    page: number;
    itemsPerPage: number;
  }>({ page: 1, itemsPerPage: 9 });
  const [mainDepartment, setMainDepartment] = useState<
    Department | undefined
  >();
  const [detailDepartment, setDetailDepartment] = useState<
    Department | undefined
  >();
  const [visibleAddDepartment, setVisibleAddDepartment] = useState(false);
  const showAddDepartment = () => {
    setVisibleAddDepartment(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const { data: userDetail } = useGetUserDetailQuery();
  const checkRole = useRoleChecker();
  const { data, isFetching } = useGetDepartmentsQuery(queries, {
    skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager),
  });

  const { data: departmentDetail } = useGetDetailDepartmentQuery(
    {
      departmentId: userDetail?.department_id,
    },
    {
      skip:
        checkRole(OUserRole.Admin) ||
        checkRole(OUserRole.ProjectManager) ||
        !userDetail?.department_id,
    }
  );

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  const subRefetch = () => {
    if (checkRole(OUserRole.Admin)) {
      setMainDepartment((oldState) => {
        return data?.departments?.find(
          (newState) => newState.department_id === oldState?.department_id
        );
      });
    } else {
      setDetailDepartment(departmentDetail);
    }
  };

  useEffect(() => {
    subRefetch();
  }, [data, departmentDetail]);

  if (checkRole(OUserRole.Staff)) {
    if (departmentDetail) {
      return (
        <UserDepartmentUi
          department={departmentDetail}
          manager={{
            username: "manager",
            avatar: "",
            email: "manager@gmail.com",
          }}
        />
      );
    } else {
      return <Empty />;
    }
  }

  return (
    <>
      <Spin
        spinning={isFetching}
        tip='Loading Departments'
        className='department-card-loading'
        size='large'
      >
        <MngPageHeader
          title='Departments'
          {...(checkRole(OUserRole.Admin) && {
            addBtnContent: "Create Department",
            addBtnOnClick: showAddDepartment,
          })}
          itemCount={checkRole(OUserRole.Manager) ? 1 : data?.total}
          filters={[]}
        />
        <div className='department-card-container'>
          {checkRole(OUserRole.Manager) ? (
            userDetail?.department_id ? (
              <>
                <div className='manager-department-ui'>
                  <ModalDepartments
                    visible={visible}
                    setVisible={setVisible}
                    department={mainDepartment}
                    closeModal={closeModal}
                    departmentDetail={detailDepartment}
                    role={
                      userDetail?.role &&
                      (userDetail?.role as RoleResponse).name
                    }
                    isModal={false}
                  />
                </div>
              </>
            ) : (
              <Empty description="You aren't in any department" />
            )
          ) : checkRole(OUserRole.Admin) ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 9,
                total: data?.total,
                onChange: onChangePage,
              }}
              dataSource={data?.departments}
              renderItem={
                data
                  ? (department) => {
                      return (
                        <List.Item>
                          <CardDepartmentss
                            onClick={() => {
                              setVisible(true);
                              setMainDepartment(department);
                            }}
                            departmentId={department.department_id}
                            title={department.name}
                            manager={
                              department?.information?.manager?.user_id
                                ? department.information.manager.name
                                : "No Manager"
                            }
                            staffCount={department.information?.total_staff}
                          />
                        </List.Item>
                      );
                    }
                  : undefined
              }
            />
          ) : null}
        </div>
      </Spin>
      <ModalDepartments
        visible={visible}
        setVisible={setVisible}
        department={mainDepartment}
        closeModal={closeModal}
        departmentDetail={detailDepartment}
        role={userDetail?.role && (userDetail?.role as RoleResponse).name}
        isModal={true}
      />
      <ModalAddDepartment
        visible={visibleAddDepartment}
        setVisible={setVisibleAddDepartment}
      />
    </>
  );
};
