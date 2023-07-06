import { UseQueryResult, useQuery } from "react-query";
import { Board } from "../entity/Board";
import useBoardStore from "../store/BoardStore";
import springAxiosInst from "../utility/axiosInstance";

export const useBoardQuery = (): UseQueryResult<Board[], unknown> => {
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