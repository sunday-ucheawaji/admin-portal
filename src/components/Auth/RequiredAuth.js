import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

RequiredAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

function RequiredAuth({ children }) {
  let location = useLocation();
  const user = useSelector((state) => state?.auth?.details);
  const token = user?.token || localStorage?.getItem("token");

  if (!token) {
    localStorage.clear();
    sessionStorage.clear();
    return <Redirect to="/login" state={{ from: location }} replace />;
  }

  // const decodedToken = jwt_decode(token, { complete: true });
  // const dateNow = new Date();

  // if (decodedToken?.exp * 1000 < dateNow) {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   return <Redirect to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default RequiredAuth;
