import { useInfoStore } from "@/stores";

const baseURL = "";

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1.非http
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url;
    }
    // 2.超时
    options.timeout = 10000;
    // 3.添加请求头
    options.header = {
      ...options.header,
      "source-client": "miniapp",
    };
    // 4.添加token请求头标识
    const userStore = useInfoStore();
    const token = userStore.userinfo?.token;
    if (token) {
      options.header.Authorization = token;
    }

    // console.log(options);
  },
};
uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

interface Data<T> {
  code: string;
  msg: string;
  result: T;
}
// 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回Promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2.请求成功
      success(res) {
        // console.log(res);

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>);
        } else if (res.statusCode === 401) {
          // 401错误 -> 清理用户信息，跳转到登录页
          const userStore = useInfoStore();
          userStore.clearUserInfo();
          uni.navigateTo({ url: "/pages/login/login" });
          reject(res);
        } else {
          // 其他错误
          uni.showToast({
            icon: "none",
            title: (res.data as Data<T>).msg || "请求错误",
          });
          reject(res);
        }
      },
      // 3.请求失败
      fail(err) {
        uni.showToast({
          title: "网络错误",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};
