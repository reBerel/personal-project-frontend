import { Board } from "../../board/entity/Board";
import { User } from "../../user/entity/User";

export interface Comment {
  commentId: number;
  writer: string;
  content: string;
  createDate: string;
  modifyDate: string;
  user: User;
  board: Board;
}


export interface ModifyComment{
  commentId: string | undefined;
  writer: string;
  content: string;
  modifyDate: string;
}