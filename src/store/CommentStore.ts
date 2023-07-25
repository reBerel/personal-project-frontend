import { create } from "zustand";
import { Comment } from "../comment/entity/Comment";

interface CommentState {
  comment: Comment;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comment: {} as Comment,
  comments: [],
  setComments: (comments) => set({ comments }),
}));

export default useCommentStore;