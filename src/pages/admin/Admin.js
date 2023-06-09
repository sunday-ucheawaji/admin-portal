import React from "react";
import Table from "../../components/table/Table";
import useAdmin from "./useAdmin";

const Admin = () => {
  const {
    adminList,
    error,
    isLoading,
    isFetching,

    adminTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  } = useAdmin();

  return (
    <div>
      <h2 className="page-header">Admins</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={adminTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={adminList}
                renderBody={(item, index) => renderBody(item, index)}
                dataShow={dataShow}
                setDataShow={setDataShow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
