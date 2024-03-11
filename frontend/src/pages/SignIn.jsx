import React from "react";

const SignIn = () => {
  return (
    <div>
      <div>
        <form method="POST">
          Email :
          <input type="email" name="email" />
          Password :
          <input type="password" name="password" />
          <button type="submit">SignIn</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
