import type { IUser } from "./user.interface";

export interface AppResponseType {
  statusCode: number;
  message: string;
  content?: IUser;
}
