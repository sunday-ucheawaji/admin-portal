import React from "react";

import Table from "../../components/table/Table";

import customerList from "../../assets/JsonData/customers-list.json";
import useAdmin from "./useAdmin";
import Badge from "../../components/badge/Badge";

const adminTableHead = [
  "",
  "Email",
  "Full Name",
  // "Role ID",
  "Role",
  "Status",
  // "Last Login",
  "Action",
];

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  ACTIVE: "success",
  refund: "danger",
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr
    style={{ cursor: "pointer" }}
    onClick={() => console.log(item)}
    key={index}
  >
    <td>{index + 1}</td>
    <td>{item.email}</td>
    <td>{item.fullName}</td>
    {/* <td>{item?.roleId}</td> */}
    <td>{item?.roleName}</td>
    <td>{item.status}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
    {/* <td>{item.lastLoginAt}</td> */}
    <td>{item.Action}</td>
  </tr>
);

const Admin = () => {
  const { adminList } = useAdmin();

  return (
    <div>
      <h2 className="page-header">Admins</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={adminTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={adminList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
