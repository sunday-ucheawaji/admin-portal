import React from "react";
import Table from "../../components/table/Table";
import useUsers from "./useUsers";

const Users = () => {
  const {
    usersList,
    error,
    isLoading,
    isFetching,

    usersTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  } = useUsers();

  return (
    <div>
      <h2 className="page-header">Users</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={usersTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={usersList}
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

export default Users;
