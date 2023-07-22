import { Board } from "../../board/entity/Board";

export interface User {
    userId: number;
    nickName: string;
    name: string;
    email: string;
    uid: string;
    board: Board;
}