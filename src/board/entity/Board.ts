import { Comment } from "../../comment/entity/Comment";

export interface Board {
    boardId: number;
    title: string;
    writer: string;
    content: string;
    createDate: string;
    modifyDate: string;
    likeCount: number;
    readCount: number;
    replyCount: number;
    boardCategory: string;
    comments: Comment[];
    likes: {
        likeId:number;
        userId:number;
    }[],
    bookmarks: {
        bookmarkId:number;
        userId:number;
    }[],
}
export interface ModifyBoard{
    boardId: string | undefined;
    title: string;
    writer: string;
    content: string;
    boardCategory: string;
}
export interface BoardCategory{
    category: string;
}
export interface BoardResponse {
    boards: Board[];
    totalPages: number;
    totalItems: number;
  }
