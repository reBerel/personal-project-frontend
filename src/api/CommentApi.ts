import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import springAxiosInst from "../utility/axiosInstance";
import { Comment } from "../comment/entity/Comment";
import useCommentStore from "../store/CommentStore";

export const useCommentQueryList = (boardId: number): UseQueryResult<Comment[], unknown> => {
  const setComments = useCommentStore((state) => state.setComments)

  const queryResult: UseQueryResult<Comment[], unknown> = useQuery(['CommentList', boardId], () => fetchCommentList(boardId), {
    onSuccess: (data) => {
      console.log(data);
      setComments(data);
    }
  });

  return queryResult;
};
export const fetchCommentList = async (boardId: number): Promise<Comment[]> => {
  const response = await springAxiosInst.get<Comment[]>(`/comment/list/${boardId}`);
  console.log("댓글 목록을 가져왔습니다.");
  console.log(response.data);
  return response.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await springAxiosInst.delete(`/comment/${commentId}`);
    console.log(`게시물 ID ${commentId}가 삭제되었습니다.`);
  } catch (error) {
    console.error(`게시물 ID ${commentId} 삭제에 실패했습니다.`, error);
  }
};


export const updateComment = async (updatedData: Comment): Promise<Comment> => {
  const { content, writer, commentId } = updatedData;
  const response = await springAxiosInst.put<Comment>(`/comment/${commentId}`, {content, writer});
  return response.data;
};
export const useBoardUpdateMutation = (): UseMutationResult<Comment, unknown, Comment> => {
  const QueryClient = useQueryClient()

  return useMutation(updateComment, {
    onSuccess: (data) => {
      QueryClient.setQueryData(['Comment', data.commentId], data)
    }
  })
}

export const registerComment = async (data: { writer: string, content: string, userId: number, boardId: number }): Promise<Comment> => {
  const response = await springAxiosInst.post<Comment>('/comment/new/register', data);
  return response.data;
};