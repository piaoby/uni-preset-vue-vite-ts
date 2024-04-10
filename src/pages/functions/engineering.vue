<template>
  <div class="my-info">
    <div v-if="infodata">
      <p>{{ infodata.proName }}</p>
      <p>建管单位：{{ infodata.org }}</p>
      <p>工程类型：{{ infodata.proType }}</p>
      <p>计划开始时间：{{ infodata.planStartTime }}</p>
      <p>计划结束时间：{{ infodata.planEndTime }}</p>
      <p>监理单位：{{ infodata.jlUnit }}</p>
      <p>施工单位：{{ infodata.sgUnit }}</p>
    </div>
    <div v-if="costData" class="cost">
      <h4 class="title">成本统计</h4>
      <div class="progressinfo">
        <div class="field">
          <div class="field-name">计划成本</div>
          <div class="field-value">{{ costData.planCost }}</div>
        </div>
        <div class="field">
          <div class="field-name">已支出</div>
          <div class="field-value">{{ costData.expenditureCost }}</div>
        </div>
        <div class="field">
          <div class="field-name">剩余</div>
          <div class="field-value">{{ costData.residueCost }}</div>
        </div>
      </div>
      <table ref="table" border stripe type="selection" emptyText="暂无更多数据">
        <tr>
          <th width="50" align="center">序号</th>
          <th width="130" align="center">支出日期</th>
          <th width="130" align="center">支出项</th>
          <th width="130" align="center">支出金额</th>
        </tr>
        <tr v-for="(item, index) in costData.proCostList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.expenditureDate }}</td>
          <td>
            {{ item.expenditure }}
          </td>
          <td>{{ item.amount }}</td>
        </tr>
      </table>
    </div>
    <div v-if="proGxPlanData" class="cost">
      <h4 class="title">施工进度</h4>
      <div class="progressinfo">
        <div class="field">
          <div class="field-name">计划进度</div>
          <div class="field-value">{{ proGxPlanData.value2 }}</div>
        </div>
        <div class="field">
          <div class="field-name">实际进度</div>
          <div class="field-value">{{ proGxPlanData.value }}</div>
        </div>
        <div class="field">
          <div class="field-name">剩余工期</div>
          <div class="field-value">{{ proGxPlanData.residueDay }}</div>
        </div>
      </div>
      <table ref="table" border stripe type="selection" emptyText="暂无更多数据">
        <tr>
          <th width="50" align="center">序号</th>
          <th width="130" align="center">施工工序</th>
          <th width="130" align="center">结束日期</th>
          <th width="130" align="center">进度占比</th>
        </tr>
        <tr v-for="(item, index) in proGxPlanData.proGxPlanList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            {{ item.planEndTime }}
          </td>
          <td>{{ item.gxWeight }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getEngineering } from "@/api/functions/engineering";
import type { ApiEngineering } from "@/api/functions/engineering";
import { useBidcodeStore } from '@/stores/modules/bidCodeStore';
import { onShow, onHide } from '@dcloudio/uni-app'
const infodata = ref<ApiEngineering>()
const bidcodeStore = useBidcodeStore()
let costData: any = reactive({
  proCostList: [],
  planCost: '',
  expenditureCost: '',
  residueCost: '',
})
let proGxPlanData: any = reactive({
  proGxPlanList: [],
  value: '',
  value2: '',
  residueDay: '',
})
onShow(() => {
  getEngineering(bidcodeStore.selectedBidcode).then((res) => {
    infodata.value = res.data.vo
    costData = res.data.proCost
    proGxPlanData.proGxPlanList = res.data.proGxPlanList
    proGxPlanData.value = res.data.item.value
    proGxPlanData.value2 = res.data.item.value2
    proGxPlanData.residueDay = res.data.item.residueDay
  })
})
onHide(() => {
  infodata.value = {} as ApiEngineering
  costData = {}
})
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border: 0;
}

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

.cost {
  border: 1px solid #ccc;
  margin: 20px 0;

  h4 {
    padding: 10px;
  }

  table {
    margin: 10px;
    border: 1px solid #ccc;
  }
}

.progressinfo {
  display: flex;
  justify-content: space-between;
}

.field {
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5px;
  font-size: small;
}

.field-value {
  font-weight: 600;
}
</style>