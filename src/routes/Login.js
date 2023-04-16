import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../cognito";

export default function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ username, password });
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="fs-1 title">Login</h1>
        <div className="field">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            className="input"
          />
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
            required
          />
        </div>

        <p className="text-red-500">{!!error && error}</p>
        <p className="text-center text-sm">
          Forgot password?{" "}
          <Link to="/forget" className="link">
            Click here
          </Link>
        </p>
        <p className="text-center text-sm">
          Need to sign up?{" "}
          <Link to="/signup" className="link">
            Click here
          </Link>
        </p>

        <button type="submit" className="mt-5 button">
          Submit
        </button>
      </form>
    </main>
  );
}
