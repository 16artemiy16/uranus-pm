export type ReqTraceUserEvent = {
  user: string;
  action: string;
  data?: any;
};

export type ReqGetUserFavouriteBoards = {
  user: string;
  limit?: number;
};
