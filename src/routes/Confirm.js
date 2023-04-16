import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmUser } from "../cognito";

export default function Confirm() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("username");

  const [code, setCode] = useState("");
  const [username, setUsername] = useState(query ? query : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmUser({ username, code });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />

      <label htmlFor="code">code</label>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        required
      />
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Submit
      </button>
    </form>
  );
}
