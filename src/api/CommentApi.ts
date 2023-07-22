import { UseQueryResult, useQuery } from "react-query";
import springAxiosInst from "../utility/axiosInstance";
import { Comment } from "../comment/entity/Comment";
import useCommentStore from "../store/CommentStore";

export const useCommentQueryList = (): UseQueryResult<Comment[], unknown> => {
    const setComments = useCommentStore((state) => state.setComments)
    
    const queryResult: UseQueryResult<Comment[], unknown> = useQuery('CommentList', fetchCommentList, {
        onSuccess: (data) => {
            setComments(data)
        }
    })
    return queryResult
}
export const fetchCommentList = async (): Promise<Comment[]> => {
    const response = await springAxiosInst.get<Comment[]>('/comment/list')
    return response.data
}
