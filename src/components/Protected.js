import { useContext } from "react";
import { GlobalContext } from "../components/Context";
import { Navigate } from "react-router-dom";

export function Private({ children }) {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function Public({ children }) {
  const { user } = useContext(GlobalContext);

  if (user) {
    return <Navigate to="/words" replace />;
  }
  return children;
}
