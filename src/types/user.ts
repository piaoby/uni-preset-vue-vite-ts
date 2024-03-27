export interface LoginResult {
  token: string; // 用户令牌
  username: string; // 用户名
  avatar?: string; // 用户头像，可选字段
  roles: string[]; // 用户角色列表
}
