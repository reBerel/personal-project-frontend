import { User } from "../user/entity/User";
import springAxiosInst from "../utility/axiosInstance"

export const loginUser = async(uid: string): Promise<User> => {
  const result = await springAxiosInst.get<User>(`/user/login/${uid}`)
  return result.data;
}
export const bookmarkChecking = async (uid: string): Promise<User> => {
  const result = await springAxiosInst.get<User>(`/user/bookmark/${uid}`)
  return result.data;
}
export const userDeleteHandler = async(userId: string): Promise<void> => {
  await springAxiosInst.delete(`/user/${userId}`)
}