import type { LoginResult } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useInfoStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userinfo = ref<LoginResult>();

    const setUserInfo = (val: LoginResult) => {
      userinfo.value = val;
    };

    const clearUserInfo = () => {
      userinfo.value = undefined;
    };

    return { userinfo, setUserInfo, clearUserInfo };
  },
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        },
      },
    },
  }
);
