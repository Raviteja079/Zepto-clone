import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useLocation } from "react-router-dom";

function LoginPage() {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    document.title = pathname;
  }, [location]);
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
