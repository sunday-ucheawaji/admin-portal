import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../assets/images/logo.svg";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { handleLogout } from "../../utilities/commons";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}

      <div onClick={handleLogout}>
        <Link to={"/login"}>
          <SidebarItem
            title={"Logout"}
            icon={"bx bx-log-out"}
            //   active={index === activeItem}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
