import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function AuthPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  return (
    <>
      {showRegisterForm ? <RegisterForm /> : <LoginForm />}
      {showRegisterForm ? (
        <a onClick={() => setShowRegisterForm(false)}>Login</a>
      ) : (
        <a onClick={() => setShowRegisterForm(true)}>Register</a>
      )}
    </>
  );
}

export default AuthPage;
