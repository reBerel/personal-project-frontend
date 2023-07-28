import { User } from "../user/entity/User";
import springAxiosInst from "../utility/axiosInstance"

export const loginUser = async(uid: string): Promise<User> => {
  const result = await springAxiosInst.get<User>(`/user/login/${uid}`)
  return result.data;
}
// export const bookmarkChecking = async (uid: string): Promise<User> => {
//   const result = await springAxiosInst.get<User>(`/user/bookmark/${uid}`)
//   return result.data;
// }
export const userDeleteHandler = async (userId: string): Promise<void> => {
  try {
    const parsedUserId = parseInt(userId, 10); // 문자열을 숫자로 변환
    await springAxiosInst.delete(`/user/${parsedUserId}`);
    console.log('회원 탈퇴가 완료되었습니다.');
  } catch (error) {
    console.error('회원 탈퇴 중에 오류가 발생했습니다.', error);
  }
};