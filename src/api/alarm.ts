import { http } from "@/utils/http";

/**
 * 获取告警信息
 */
export const getalarmLists = (bidCode: string | null) => {
  return http({
    method: "GET",
    url: "/background/app/index/alarmLists?bidCode=" + bidCode,
  });
};
