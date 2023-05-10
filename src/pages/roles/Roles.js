import React from "react";

import Table from "../../components/table/Table";
import useRoles from "./useRoles";

const Roles = () => {
  const {
    rolesList,
    error,
    isLoading,
    isFetching,

    roleTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  } = useRoles();

  return (
    <div>
      <h2 className="page-header">Roles</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={roleTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={rolesList}
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

export default Roles;
