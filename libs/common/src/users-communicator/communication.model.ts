export enum UsersMsg {
  GetAll = 'get_all',
  Create = 'create',
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
