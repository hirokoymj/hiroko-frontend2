import React, { useState, useReducer, createContext, useEffect } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { LOGIN_USER } from "Mutations/Login";
// import { ILoginVars, IUser } from "Types/api/Login";
import { ILoginVars } from "Types/api/Login";
import { useMutation } from "@apollo/react-hooks";
import { ILoginFormFields } from "Types/forms";
import get from "lodash/get";

interface AuthAction {
  type: string;
  payload?: IUser;
}

interface AuthState {
  user: IUser | null;
}

interface IUserContext {
  user: IUser | null;
  logout: () => void;
  login: (user: IUser) => void;
  // login: (values: ILoginFormFields) => void;
}

interface IUser {
  username: string;
  email: string;
  // password: string;
  token: string;
}

interface InitialState {
  user: IUser | null;
}

const initialState: any = { user: null };

interface UserToken {
  user_id: string;
  email: string;
  iat: number;
  exp: number;
}

// Decode JWT Token
if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode<UserToken>(token);
  console.log("decode: ---");
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

export const AuthContext = createContext<IUserContext>({} as IUserContext);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload as IUser,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: any) => {
  // const [user, setUser] = useState<IUser | null>(null);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: IUser) => {
    localStorage.setItem("token", user.token);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        logout,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// TEST USER -1
// test@test.com
// test

// TEST USER -2
// test123@gmail.com
// test123
