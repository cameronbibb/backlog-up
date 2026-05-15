import { useAuth } from "../context/AuthContext";

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

export default Home;
