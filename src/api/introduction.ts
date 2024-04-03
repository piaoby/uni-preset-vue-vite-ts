import { http } from "@/utils/http";

export interface ApiIntroduction {
  img: string;
  proBrief: string;
  org: string;
  proType: string;
  planStartTime: string;
  planEndTime: string;
  jlUnit: string;
  sgUnit: string;
}
/**
 * 获取项目简介信息
 */
export const getProBrief = (bidCode: string | null) => {
  return http({
    method: "GET",
    url: "/background/app/index/getProBrief?bidCode=" + bidCode,
  });
};
