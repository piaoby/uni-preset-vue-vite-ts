import { http } from "@/utils/http";

// 定义一个 TypeScript 接口
export interface ApiIntroduction {
  //   value: any;
  img: string | undefined;
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
