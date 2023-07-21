import { create } from "zustand"
import { User } from "../user/entity/User"

interface UserState {
user: User
users: User[]
setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user : {} as User,
  users: [],
  setUser: (user:User) => set({user}),
}))

export default useUserStore