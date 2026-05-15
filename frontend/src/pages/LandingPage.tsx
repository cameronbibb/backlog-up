import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <h1>This is the Landing Page</h1>
      <p>This page will have information about Backlog Up</p>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Landing;
