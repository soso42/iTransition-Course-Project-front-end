import { User } from "./user.model";

export interface Comment {
  commentId: number,
  text: string,
  dateTime: string;
  author: User
}
