import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmUser } from "../cognito";

export default function Confirm() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("username");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState(query ? query : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmUser({ username, code });
      navigate("/login");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <h1 className="title fs-1">Confirm your email</h1>
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
            className="input"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="code" className="label">
            code
          </label>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            className="input"
            required
          />
        </div>

        <p className="text-red-500">{!!error && error}</p>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </main>
  );
}
