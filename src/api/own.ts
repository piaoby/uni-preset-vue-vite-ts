import { http } from "@/utils/http";

export type FunctionItem = {
  img: string;
  text: string;
  value: string;
};
export type projectnameItem = {
  proName: string;
  bidCode: string;
};
export interface timeInfo {
  durationDay: number;
  planStartTime: string;
  planEndTime: string;
  value: number;
  value2: number;
}

/**
 * 获取工程下拉信息
 */
export const getProsByUser = (roleCode: string) => {
  return http({
    method: "GET",
    url: "/background/app/index/getProsByUser?roleCode=" + roleCode,
  });
};
/**
 * 获取工程进度
 */
export const getproProgress = (bidCode: string) => {
  return http({
    method: "GET",
    url: "/background/app/index/proProgress?bidCode=" + bidCode,
  });
};
