import React, { useContext, useEffect } from "react";
import { AuthContext } from "Context/authContext";
import get from "lodash/get";

export const LoginTestView = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Login Test View</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
