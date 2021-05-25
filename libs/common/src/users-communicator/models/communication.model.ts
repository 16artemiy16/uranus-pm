export enum UsersMsg {
  GetAll = 'get_all',
  Create = 'create',
  Login = 'login',
  Verify = 'verify',
}

export interface UserI {
  _id: string;
  email: string;
  password: string;
}

export type ResGetAll = UserI[];
export type ReqCreate = {
  email: string;
  password: string;
};
export type ResCreate = UserI;

export type ReqLogin = {
  email: string;
  password: string;
};

export type ResLogin = string | null;
