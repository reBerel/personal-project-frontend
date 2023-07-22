import { create } from "zustand";
import { Comment } from "../comment/entity/Comment";

interface CommentState {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
}));

export default useCommentStore;