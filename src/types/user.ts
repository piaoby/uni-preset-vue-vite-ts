export interface LoginResult {
  token: string; // 用户令牌
  userInfo: {
    roleCode: string;
    roleName?: string;
    deptName?: string;
  }; // 用户角色列表
}
