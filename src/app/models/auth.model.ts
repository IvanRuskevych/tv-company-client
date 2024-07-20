export interface ILogin {
  employeeID: string;
  password: string;
}

export interface IAuth {
  accessToken: string;
  refreshToken: string;
}
