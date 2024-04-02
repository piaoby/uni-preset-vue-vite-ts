import { http } from "@/utils/http";
interface Personne {
  userName: string;
  idNumber: string;
  phone: string;
  status: string;
  sex: string;
  img: string | undefined;
}
export type PersonneArray = Personne[];
/**
 * 获取人员信息
 */
export const getPersonnelList = (bidCode: string) => {
  return http({
    method: "GET",
    url: "/background/app/index/getPersonnelList?bidCode=" + bidCode,
  });
};
