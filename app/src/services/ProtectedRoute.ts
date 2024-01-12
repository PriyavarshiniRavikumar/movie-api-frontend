import React from "react";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
interface IProtectedRoute {
  children: React.ReactNode;
  //children: JSX.Element | JSX.Element[]
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  let user_token = localStorage.getItem("token");
  //console.log(user_token);
  return user_token ? children : Navigate({ to: "/login", replace: true });
  // if (!user_token) {
  //   return <Navigate>
  // }
  // return children;
};

export default ProtectedRoute;
