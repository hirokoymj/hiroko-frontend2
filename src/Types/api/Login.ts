export interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface IRegisterVars {
  registerInput: RegisterInput;
}

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export interface ILoginVars {
  loginInput: ILoginInput;
}

type ILoginInput = {
  email: string;
  password: string;
};
