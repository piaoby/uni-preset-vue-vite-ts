import { http } from "@/utils/http";

export interface ApiEngineering {
  proName: string;
  proBrief: string;
  org: string;
  proType: string;
  planStartTime: string;
  planEndTime: string;
  jlUnit: string;
  sgUnit: string;
}
/**
 * 获取工程信息
 */
export const getEngineering = (bidCode: string | null) => {
  return http({
    method: "GET",
    url: "/background/app/index/proManagement?bidCode=" + bidCode,
  });
};
