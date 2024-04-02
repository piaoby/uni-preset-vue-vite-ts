<template>
  <div class="my-info">
    <img src="" alt="">
    <h4 class="title">项目概况</h4>
    <span>{{ infodata.proBrief }}</span>
    <p>建管单位：{{ infodata.org }}</p>
    <p>工程类型：{{ infodata.proType }}</p>
    <p>计划开始时间：{{ infodata.planStartTime }}</p>
    <p>计划结束时间：{{ infodata.planEndTime }}</p>
    <p>监理单位：{{ infodata.jlUnit }}</p>
    <p>施工单位：{{ infodata.sgUnit }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getProBrief } from "@/api/introduction";
import type { ApiIntroduction } from "@/api/introduction";
import { useBidcodeStore } from '@/stores/modules/bidCodeStore'
import { onShow } from '@dcloudio/uni-app'
const infodata = ref<ApiIntroduction>({})
const bidcodeStore = useBidcodeStore()
onShow(() => {
  getProBrief(bidcodeStore.selectedBidcode).then((res) => {
    infodata.value = res.data
    console.log(infodata.value)
  })
})
</script>

<style lang="scss" scoped>
.my-info {
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-height: 83vh;

  span {
    padding-top: 10px;
    text-indent: 2em;
  }

  p {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
}
</style>