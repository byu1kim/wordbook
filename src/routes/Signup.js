import { useState } from "react";
import * as cognito from "../cognito";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError("Password doesn't match");
    } else {
      try {
        // Create user in Cognito
        const user = await cognito.signUp({ username, email, password });

        // Create user information in Database
        // Retry with Axios
        await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/user", {
          method: "POST",
          body: JSON.stringify({
            userId: user.userSub,
            fname: fname,
            lname: lname,
            username: username,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        navigate(`/confirm?username=${username}`);
      } catch (e) {
        setError(e.message);
      }
    }
  };

  return (
    <main className="mx-auto max-w-xl">
      <form onSubmit={handleSignup} className="form">
        <h1 className="title fs-1">Sign up</h1>
        <div className="field">
          <label htmlFor="fname" className="label">
            First Name
          </label>
          <input name="fname" type="text" onChange={(e) => setFname(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label htmlFor="lname" className="label">
            Last Name
          </label>
          <input name="lname" type="text" onChange={(e) => setLname(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label htmlFor="password2" className="label">
            Password Confirmation
          </label>
          <input name="password2" type="password" onChange={(e) => setPassword2(e.target.value)} className="input" />
        </div>

        <p className="text-red-500">{!!error && error}</p>

        <p className="text-center text-sm m-2">
          Need to login?
          <Link to="/login" className="link">
            Click here
          </Link>
        </p>

        <button className="button">Submit</button>
      </form>
    </main>
  );
}
