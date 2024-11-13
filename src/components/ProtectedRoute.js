import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return <>{userInfo ? <Route {...props} /> : <Redirect to="/login" />}</>;
};

export default ProtectedRoute;
