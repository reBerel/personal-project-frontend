import { create } from "zustand"
import { User } from "../user/entity/User"

interface UserState {
user: User
setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user : {} as User,
  setUser: (user:User) => set({user}),
}))

export default useUserStore