import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Navbar() {
  const { user } = useAuth0();
  const [username, setuser] = useState(user);
  useEffect(() => {
    if (user != undefined) {
      console.log(user);
      fetch("http://localhost:3004/loginuser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (data) => data.json())
        .then((data) => {});
    }
  });
  return (
    <>
      <h1
        style={{
          "margin-top": "123px",
        }}
      >
        hello
      </h1>
    </>
  );
}

export default Navbar;
