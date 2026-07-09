import AuthPage from "./pages/AuthPage";
import { Navigate, Routes, Route } from "react-router";
import LoginForm from "./pages/components/LoginForm";
import RegisterForm from "./pages/components/RegisterForm";
import Landing from "./pages/LandingPage";
import Home from "./pages/HomePage";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import GuestRoute from "./pages/components/GuestRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Landing />} />
          <Route element={<AuthPage />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
