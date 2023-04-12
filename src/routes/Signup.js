import { useState } from "react";
import * as cognito from "../cognito";
import axios from "axios";

export default function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await cognito.signUp({ username, email, password });

    // Retry with Axios
    const result = await fetch("https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/user", {
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
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <label htmlFor="fname">fName</label>
        <input name="fname" type="text" onChange={(e) => setFname(e.target.value)} />

        <label htmlFor="lname">lName</label>
        <input name="lname" type="text" onChange={(e) => setLname(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="username">Username</label>
        <input name="username" type="text" onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="password2">Password Confirmation</label>
        <input name="password2" type="password" onChange={(e) => setPassword2(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
}
