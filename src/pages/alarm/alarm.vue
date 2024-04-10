<template>
  <div class="alarm">
    <div v-if="alarmLists.length">
      <div class="alarm-item" v-for="(item, index) in alarmLists" :key="index">
        <img :src="item.img" class="alarm-icon" />
        <div class="alarm-info">
          <p>{{ item.warnContent }}</p>
        </div>
        <div :class="{ 'alarm-status': true, 'status-out': item.status === '离场' }">
          <p>{{ item.status }}</p>
          <p>{{ item.time }}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      暂无告警信息
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getalarmLists } from "@/api/alarm";
import { useBidcodeStore } from '@/stores/modules/bidCodeStore'
import { onShow, onHide } from '@dcloudio/uni-app'
const bidcodeStore = useBidcodeStore()
let alarmLists: any = ref<any>([]);
onShow(() => {
  getalarmLists(bidcodeStore.selectedBidcode).then((res) => {
    alarmLists.value = res.data
  })
})
onHide(() => {
})
</script>

<style lang="scss" scoped>
.alarm-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #ffff;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: calc(100% - 1rem);
    height: 1px;
    background-color: #ccc;
    position: absolute;
    bottom: 0;
    left: 0.5rem;
    right: 0.5rem;
  }

  .alarm-icon {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .alarm-info {
    flex: 1;

    .alarm-text {
      font-weight: bold;
      color: #333;
    }

    p {
      margin-top: 10px;
      font-size: 0.9rem;
      color: #666;
    }
  }

  .alarm-status {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #13baa5;
    border: #13baa5 1px solid;
    font-size: smaller;
    height: 20px;
    width: 45px;
    font-size: xx-small;
    line-height: 20px;
    text-align: center;
    border-radius: 0 5px 0 5px;
  }

  .status-out {
    color: red !important;
    border: red 1px solid !important;
  }
}

.alarm-action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  /* 根据需要调整右侧边距 */

  .alarm-action-button {
    width: 55px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border: none;
    background-color: #13baa5;
    /* 背景颜色可自定义 */
    color: white;
    cursor: pointer;
    border-radius: 0;
    text-align: center;
    margin-left: 0.5rem;
    /* 按钮之间的间距 */
    margin: 0.5rem 0 1.5rem 10px;
  }

  .delete-button {
    background-color: red !important;
  }
}

.no-data {
  text-align: center;
  margin: auto;
}
</style>
