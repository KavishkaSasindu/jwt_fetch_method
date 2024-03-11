import React from "react";

const SignUp = () => {
  return (
    <div>
      <div>
        <form method="POST">
          Username :
          <input type="text" name="username" />
          Email :
          <input type="email" name="email" />
          Password :
          <input type="password" name="password" />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
