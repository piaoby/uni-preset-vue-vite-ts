import { http } from "@/utils/http";

/**
 * 获取个人信息
 */
// export const getMemberProfileAPI = () => {
//   return http({
//     method: 'GET',
//     url: '/member/profile',
//   })
// }

/**
 * 修改个人信息
 * @param data 请求体参数
 */
export const postUserInfoAPI = (data: any) => {
  return http({
    method: "POST",
    url: "/auth/login",
    data,
  });
};
