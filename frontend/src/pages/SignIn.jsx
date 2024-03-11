import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [getData, setData] = useState({
    email: "",
    password: "",
  });

  const changeValue = (e) => {
    setData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };

  const handleData = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getData),
      });
      const logUser = await response.json();
      if (response.status === 200) {
        localStorage.setItem("jwt", logUser.jwt);
        console.log(logUser.jwt);
        navigate("/home");
      } else {
        console.log("Invalid");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div>
        <form method="POST" onSubmit={handleData}>
          Email :
          <input type="email" name="email" onChange={changeValue} />
          Password :
          <input type="password" name="password" onChange={changeValue} />
          <button type="submit">SignIn</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
