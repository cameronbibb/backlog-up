import AuthPage from "./pages/AuthPage";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Link } from "react-router";
import LoginForm from "./pages/components/LoginForm";
import RegisterForm from "./pages/components/RegisterForm";

function App() {
  // const { accessToken, user } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthPage />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
}

function Home() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Backlog Up</h1>
      <p>Welcome to your game collection.</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}

function Landing() {
  return (
    <>
      <h1>This is the Landing Page</h1>
      <p>This page will have information about Backlog Up</p>
      <Link to="/login">Login</Link>
    </>
  );
}

export default App;
