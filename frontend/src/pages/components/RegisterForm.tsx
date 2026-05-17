import { useState } from "react";
import { registerUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RegisterForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const { access_token, user } = await registerUser(
        email,
        password,
        confirmPassword,
      );
      login(access_token, user);
      setError(null);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setConfirmPasswordTouched(true)}
          ></input>
          {confirmPasswordTouched && password !== confirmPassword
            ? "Confirmation password must equal password."
            : ""}
        </div>
        <button
          type="submit"
          disabled={
            email === "" || password === "" || password !== confirmPassword
          }
        >
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default RegisterForm;
