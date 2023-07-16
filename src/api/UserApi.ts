import { User } from "../user/entity/User";
import springAxiosInst from "../utility/axiosInstance"

export const loginUser = async(uid: string): Promise<User> => {
  const result = await springAxiosInst.get<User>(`/user/login/${uid}`)
  return result.data;
}