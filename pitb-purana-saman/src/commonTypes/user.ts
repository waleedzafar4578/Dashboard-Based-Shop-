export interface UserAuth{
    token:string;
    userid:number;
    username:string;
    userrole:string;
}

export type LoginPayload = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  userid: number;
  username: string;
  userrole: string;
};

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}
