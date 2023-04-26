import { useEffect, useState } from "react";
import * as cognito from "../cognito";

export default function Profile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    (async () => {
      const token = await cognito.getAccessToken();
      const result = await fetch(`https://lq6xow6ye6.execute-api.ca-central-1.amazonaws.com/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());
      setProfile(result);
    })();
  }, []);

  return (
    <div className="m-auto max-w-2xl center">
      {profile && (
        <>
          <div>
            Name : {profile.fname} {profile.lname}
          </div>
          <div>Username : {profile.username}</div>
          <div>Email : {profile.email}</div>
        </>
      )}
    </div>
  );
}
