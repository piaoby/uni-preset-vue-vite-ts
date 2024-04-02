import { http } from "@/utils/http";
interface Car {
  img: string | undefined;
  gender: any;
  carId: any;
  phoneId: any;
  status: string;
  accessType: string;
  accesssTime: string;
  bidCode: string;
  carNum: string;
  date: string;
  endDate: string;
  id: string;
  phone: string;
  proId: string;
  startDate: string;
  userName: string;
}
export type CarArray = Car[];
/**
 * 获取车辆信息
 */
export const getCarList = (bidCode: string) => {
  return http({
    method: "GET",
    url: "/background/app/index/getCarList?bidCode=" + bidCode,
  });
};
