import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [getData, setData] = useState({
    username: "",
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
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getData),
      });

      const userData = await response.json();
      if (response.status === 201) {
        console.log(userData);
        localStorage.setItem("jwt", userData.jwt);
        navigate("/user/signIn");
      } else {
        console.log("user error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div>
        <form method="post" onSubmit={handleData}>
          Username :
          <input type="text" name="username" onChange={changeValue} />
          Email :
          <input type="email" name="email" onChange={changeValue} />
          Password :
          <input type="password" name="password" onChange={changeValue} />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
