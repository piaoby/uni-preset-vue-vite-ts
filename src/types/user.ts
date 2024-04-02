export interface LoginResult {
  token: string; // 用户令牌
  userInfo: {
    roleCode: string;
  }; // 用户角色列表
}
