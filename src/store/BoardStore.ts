import { create } from "zustand"
import { Board } from "../board/entity/Board"

interface BoardState {
    boards: Board[]
    selectedCategory: string;
    setBoards: (boards: Board[]) => void
}

export const useBoardStore = create<BoardState>((set) => ({
    boards : [],
    selectedCategory: '',
    setBoards: (boards) => set({boards}),
}))

export default useBoardStore