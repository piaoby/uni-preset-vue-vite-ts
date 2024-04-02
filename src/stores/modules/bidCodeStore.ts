// bidcodeStore.ts
import { defineStore } from "pinia";

interface State {
  selectedBidcode: string | null; // 假设 bidCode 是字符串类型
}

export const useBidcodeStore = defineStore("bidcode", {
  state: (): State => ({
    selectedBidcode: null, // 初始化 selectedBidcode
  }),
  actions: {
    setSelectedBidcode(bidCode: string) {
      this.selectedBidcode = bidCode;
    },
  },
});
