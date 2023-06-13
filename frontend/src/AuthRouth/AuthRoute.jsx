import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function AuthRoute({ children }) {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [fromPage, setFromPage] = useState(location.pathname);

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
