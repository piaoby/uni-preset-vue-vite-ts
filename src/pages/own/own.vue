<template>
  <div class="my-page">
    <!-- 用户信息卡片 -->
    <div class="user-info">
      <div class="card-content">
        <div class="user-details">
          <img class="avatar" src="/static/logo.png" />
          <div class="text-info">
            <view class="dropdown">
              <view class="dropdown-display" @click="triggerDropdown">
                {{ selectedProname }}
              </view>
              <view v-if="isOpen" class="dropdown-options">
                <view v-for="(option, index) in projectnameItem" :key="index" class="dropdown-option"
                  @click="selectOption(option)">
                  {{ option.proName }}
                </view>
              </view>
            </view>
            <p class="email">{{ userEmail }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 更多功能卡片 -->
    <div class="card more-functions">
      <div class="card-content">
        <h4 class="title">更多功能</h4>
        <div class="functions-grid">
          <div class="function-item" v-for="(item, index) in functions" :key="index" @click="goTofunctions(item.value)">
            <img :src="item.img" :alt="item.text" class="function-icon" />
            <span class="function-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目进度卡片 -->
    <div class="card project-progress">
      <div class="card-content">
        <h4 class="title">项目进度</h4>
        <div id="chart" style="width: 100%; height: 180px"></div>
        <div class="progressinfo">
          <div class="field" v-for="(value, key) in state.fields" :key="key">
            <div class="field-name">{{ key }}</div>
            <div class="field-value">{{ value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

import { ref, onMounted } from "vue";
import { useInfoStore } from "@/stores";
import { useBidcodeStore } from '@/stores/modules/bidCodeStore'
import { getProsByUser, getproProgress } from "@/api/own"
import type { projectnameItem, FunctionItem, timeInfo } from "@/api/own"
const state = {
  userEmail: "赵小军",
  progress: 50,
  functions: [
    {
      img: "/static/own/engineering.png",
      text: "工程管理",
      value: "engineering",
    },
    { img: "/static/own/video.png", text: "视频监控", value: "video" },
    { img: "/static/own/risk.png", text: "风险识别", value: "risk" },
    { img: "/static/own/user.png", text: "人员管理", value: "user" },
    { img: "/static/own/car.png", text: "车辆管理", value: "car" },
  ],
  fields: {
    计划开始时间: "2022-01-01",
    计划工期: "120天",
    计划结束时间: "2022-01-01",
  },
}
const userStore = useInfoStore();
const selectedBidcode = ref<string>("");
const selectedProname = ref<string>("");
const userEmail = ref<string>("");
const userSelect = ref();
const isOpen = ref(false)
const progress = ref<number>(0);
const functions = ref<FunctionItem[]>([]);
let projectnameItem = ref<projectnameItem[]>()
const roleCode = ref();
const fields = ref<timeInfo>({
  planStartTime: "",
  planEndTime: "",
  durationDay: 0,
  value: 0,
  value2: 0,
})
const bidcodeStore = useBidcodeStore()

userEmail.value = state.userEmail;
progress.value = state.progress;
functions.value = state.functions;
roleCode.value = userStore.userinfo?.userInfo.roleCode;

const goTofunctions = (functionVal: string) => {
  uni.navigateTo({
    url: `/pages/functions/${functionVal}?bidCode=${selectedBidcode.value}`,
  });
};
//下拉切换选中事件
const triggerDropdown = (): void => {
  // userSelect.value?.click();

  isOpen.value = true
};
//下拉切换事件
const selectOption = (val: any) => {
  selectedProname.value = val.proName
  selectedBidcode.value = val.bidCode
  bidcodeStore.setSelectedBidcode(val.bidCode)
  isOpen.value = false
  getEchartdata(val.bidCode)
}
//获取下拉数据
const getUserNames = () => {
  getProsByUser(roleCode.value).then((res) => {
    projectnameItem = res.data;
    selectedProname.value = projectnameItem[0].proName;
    selectedBidcode.value = projectnameItem[0].bidCode;
    bidcodeStore.setSelectedBidcode(selectedBidcode.value)
    getEchartdata(selectedBidcode.value)
  });
};
//获取工程进度
const getEchartdata = (val: string) => {
  getproProgress(val).then((res) => {
    fields.value = res.data as timeInfo;
    state.fields.计划工期 = res.data.durationDay + "天";
    state.fields.计划开始时间 = res.data.planStartTime;
    state.fields.计划结束时间 = res.data.planEndTime;
    const remaining = 100 - (fields.value.value2 + fields.value.value)
    console.log(remaining, 'ss');

    const chartDom = document.getElementById("chart") as HTMLDivElement;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: `实际进度:${fields.value.value}%`,
        left: "center",
        top: "center",
        textStyle: {
          color: "#30DB9D",
          fontSize: 10,
        },
      },
      series: [
        {
          name: "产品结构",
          type: "pie",
          padAngle: 2,
          startAngle: 90,
          radius: ["60%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { name: "实际进度", value: fields.value.value },
            { name: "计划进度", value: fields.value.value2 },
            { name: "剩余进度", value: remaining },
          ],
          itemStyle: {
            normal: {
              color: function (params: { dataIndex: any }) {
                var colorList = [
                  ["#20D7FD", "#05FFA5"],
                  ["#FF9905", "#FFD419"],
                  ["#FCFCFC", "#FCFCFC"],
                ];
                var index = params.dataIndex;
                return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  {
                    offset: 0,
                    color: colorList[index][0],
                  },
                  {
                    offset: 1,
                    color: colorList[index][1],
                  },
                ]);
              },
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  });
};
onMounted(() => {
  getUserNames()


});
</script>

<style lang="scss" scoped>
.my-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background-image: url(" /static/bacimg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 83vh;
}

.card {
  background: #fff;
  border-radius: 10px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.card-content {
  padding: 20px;
}

.user-info .card-content {
  display: flex;
  align-items: center;
}

.user-details {
  display: flex;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 40%;
  margin-right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
}

.text-info {
  display: flex;
  flex-direction: column;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 200px;
}

.dropdown-display {
  padding: 5px 30px 5px 5px;
  font-size: 20px;
  font-weight: 600;
  width: 200px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="%23333" d="M5 8l5 5 5-5z"/></svg>') no-repeat;
  background-position: right 5px center;
  background-size: 20px 20px;
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.dropdown-options {
  position: absolute;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 6px 12px;
}

.dropdown-option {
  /* Style your options here */
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.email {
  font-size: 14px;
  padding-left: 5px;
  font-weight: 600;
}

.title {
  margin: 0;
  margin-bottom: 15px;
}

.more-functions .functions-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;
  /* 用于抵消功能项的外边距 */
  /* padding: 20px; */
}

.function-item {
  flex: 0 0 calc(25% - 20px);
  /* 每个功能项占据25%的宽度，减去外边距 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  /* 功能项之间的空间 */
  box-sizing: border-box;
  /* 确保边距包含在宽度计算内 */
}

.function-icon {
  width: 35px;
  /* 图片宽度 */
  height: 35px;
  /* 图片高度，取决于实际需要 */
  margin-bottom: 8px;
  /* 图片与文字之间的距离 */
}

.function-text {
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
}

.progress-bar {
  background-color: #eaeaea;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 10px;
  background-color: #4caf50;
  width: 0;
  /* 初始宽度为0，会通过Vue的样式绑定动态设置 */
  border-radius: 5px;
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
