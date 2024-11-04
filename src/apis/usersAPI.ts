import { User, patchUsers, postUsers, postUsersImageRes } from "./API.type";
import fetchInstance from "./fetchInstance";

const userAPI = {
  // 회원가입
  postSignup: async (body: postUsers) => {
    const data = await fetchInstance.post<User>("/users", body);
    return data;
  },
  // 내 정보 조회
  getUsers: async () => {
    const data = await fetchInstance.get<User>("/users/me");
    return data;
  },
  // 내 정보 수정
  patchUsers: async (body: patchUsers) => {
    const data = await fetchInstance.patch<User>("/users/me", body);
    return data;
  },
  // 프로필 이미지 url 생성
  postUsersImage: async (formData: FormData) => {
    const data = await fetchInstance.post<postUsersImageRes>("/users/me/image", formData);
    return data;
  },
};
export default userAPI;
