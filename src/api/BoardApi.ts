import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { Board, ModifyBoard } from "../board/entity/Board";
import useBoardStore from "../store/BoardStore";
import springAxiosInst from "../utility/axiosInstance";

export const useBoardQueryList = (): UseQueryResult<Board[], unknown> => {
    const setBoards = useBoardStore((state) => state.setBoards)
    
    const queryResult: UseQueryResult<Board[], unknown> = useQuery('boardList', fetchBoardList, {
        onSuccess: (data) => {
            setBoards(data)
        }
    })
    return queryResult
}
export const fetchBoardList = async (): Promise<Board[]> => {
    const response = await springAxiosInst.get<Board[]>('/board/list')
    return response.data
}

export const registerBoard =  async (
    data: {title: string, writer: string, content: string}
    ): Promise<Board> => {
        const response = await springAxiosInst.post<Board>('/board/register', data)
        return response.data
}

export const fetchBoard = async (boardId: string): Promise<Board | null> => {
    const response = await springAxiosInst.get<Board>(`/board/${boardId}`)    
    return response.data    
}

export const incrementReadCount = async (boardId: string): Promise<void> => {
    try {
      await springAxiosInst.get(`/board/read-count/${boardId}`);
      console.log("API 요청 성공");
    } catch (error) {
        console.error('API 요청 실패:', error);
    }
  };
  

export const useBoardQuery = (boardId: string): UseQueryResult<Board | null, unknown> => {
    return useQuery(['board', boardId], () => fetchBoard(boardId))
}

export const updateBoard = async(updatedData: ModifyBoard): Promise<ModifyBoard> => {
    const { boardId, title,  writer, content } = updatedData

    const response = await springAxiosInst.put<ModifyBoard>(
        `/board/${boardId}`, {title, content,writer})

        return response.data
}

export const useBoardUpdateMutation = (): UseMutationResult<ModifyBoard, unknown, ModifyBoard> => {
    const QueryClient = useQueryClient()

    return useMutation(updateBoard, {
        onSuccess: (data) => {
            QueryClient.setQueryData(['modifyBoard', data.boardId],data)
}})}

export const deleteBoard = async(boardId: string): Promise<void> => {
    await springAxiosInst.delete(`/board/${boardId}`)
}

export const searchBoard = async (keyword: string): Promise<Board[]> => {
    try {
      const response = await springAxiosInst.get<Board[]>(`/board/search?boardId=${keyword}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search board:', error);
      throw error;
    }
  };