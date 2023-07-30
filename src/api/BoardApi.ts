import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { Board, BoardResponse, ModifyBoard } from "../board/entity/Board";
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

export const useBookmarkQueryList = (userId:number): UseQueryResult<Board[], unknown> => {
  const setBoards = useBoardStore((state) => state.setBoards)
  
  const queryResult: UseQueryResult<Board[], unknown> = useQuery('bookmarkList',()=>fetchBookmarkList(userId), {
      onSuccess: (data) => {
          setBoards(data)
      }
  })
  return queryResult
}
export const fetchBookmarkList = async (userId:number): Promise<Board[]> => {
  const response = await springAxiosInst.get<Board[]>(`/user/bookmarkList/${userId}`)
  return response.data
}

export const registerBoard =  async (
    data: {title: string, writer: string, content: string, category: string}
    ): Promise<Board> => {
        const response = await springAxiosInst.post<Board>('/board/register', data)
        return response.data
}

export const fetchBoard = async (boardId: string): Promise<Board | null> => {
    const response = await springAxiosInst.get<Board>(`/board/${boardId}`)    
    console.log(response.data)
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
    const { boardId, title,  writer, content, boardCategory } = updatedData

    const response = await springAxiosInst.put<ModifyBoard>(
        `/board/${boardId}`, {title, content, writer, boardCategory})

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
  export const fetchBoardListPage = async (pageNumber: number, pageSize: number): Promise<BoardResponse> => {
    try {
      const response = await springAxiosInst.get<BoardResponse>(`/board/list-page?page=${pageNumber}&size=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch board list page:', error);
      throw error;
    }  
  };