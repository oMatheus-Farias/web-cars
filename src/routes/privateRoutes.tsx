import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }: { children: ReactNode }){
  const { signed } = useContext(AuthContext);

  if(!signed){
    return <Navigate to="/login" />
  };

  return children;
};