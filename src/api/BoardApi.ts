import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { Board } from "../entity/Board";
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

export const useBoardQuery = (boardId: string): UseQueryResult<Board | null, unknown> => {
    return useQuery(['board', boardId], () => fetchBoard(boardId))
}

export const updateBoard = async(updatedData: Board): Promise<Board> => {
    const { boardId, title,  writer, content } = updatedData

    const response = await springAxiosInst.put<Board>(
        `/board/${boardId}`, {title, content,writer})

        return response.data
}

export const useBoardUpdateMutation = (): UseMutationResult<Board, unknown, Board> => {
    const QueryClient = useQueryClient()

    return useMutation(updateBoard, {
        onSuccess: (data) => {
            QueryClient.setQueryData(['board', data.boardId],data)
}})}

export const deleteBoard = async(boardId: string): Promise<void> => {
    await springAxiosInst.delete(`/board/${boardId}`)
}