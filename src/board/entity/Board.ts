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
