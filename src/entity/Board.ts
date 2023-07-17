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
}
export interface ModifyBoard{
    boardId: string | undefined;
    title: string;
    writer: string;
    content: string;
}