import { useContext } from "react";
import { GlobalContext } from "../components/Context";

import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { user } = useContext(GlobalContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
