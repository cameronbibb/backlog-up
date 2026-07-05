import { useState } from "react";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const { access_token, user } = await loginUser(email, password);
    //need a try/catch block here for the following cases:
    //--if user doesn't exist
    //--if user exists but the password is wrong
    login(access_token, user);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" disabled={email === "" || password === ""}>
          Submit
        </button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default LoginForm;
