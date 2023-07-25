import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import springAxiosInst from "../utility/axiosInstance";
import { Comment } from "../comment/entity/Comment";
import useCommentStore from "../store/CommentStore";

export const useCommentQueryList = (): UseQueryResult<Comment[], unknown> => {
    const setComments = useCommentStore((state) => state.setComments)

    const queryResult: UseQueryResult<Comment[], unknown> = useQuery('CommentList', fetchCommentList, {
        onSuccess: (data) => {
            console.log(data)
            
            setComments(data)
        }
    })
    return queryResult
}
export const fetchCommentList = async (): Promise<Comment[]> => {
    const response = await springAxiosInst.get<Comment[]>('/comment/list')
    console.log("이거는 잘 가지니?")
    console.log(response.data)
    return response.data
}

export const registerComment =  async (
    data: { writer: string, content: string}
    ): Promise<Comment> => {
        const response = await springAxiosInst.post<Comment>('/comment/register', data)
        return response.data
}

export const deleteComment = async (commentId: string): Promise<void> => {
    try {
      await springAxiosInst.delete(`/comment/${commentId}`);
      console.log(`게시물 ID ${commentId}가 삭제되었습니다.`);
    } catch (error) {
      console.error(`게시물 ID ${commentId} 삭제에 실패했습니다.`, error);
    }
  };
  
export const updateComment = async (updatedData: Comment): Promise<Comment> => {
    const { commentId, content } = updatedData; // 'updatedData'에서 'commentId'와 'content'를 구조분해 할당
  
    const response = await springAxiosInst.put<Comment>(`/comment/${commentId}`, { content });
    return response.data;
  };
export const useBoardUpdateMutation = (): UseMutationResult<Comment, unknown, Comment> => {
    const QueryClient = useQueryClient()

    return useMutation(updateComment, {
        onSuccess: (data) => {
            QueryClient.setQueryData(['Comment', data.commentId],data)
}})}