// import { useState } from "react";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
import { Outlet } from "react-router-dom";

function AuthPage() {
  // const [showRegisterForm, setShowRegisterForm] = useState(false);
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthPage;
