<template>
  <div class="car">
    <div v-for="(item, index) in persondata" :key="index">
      <div class="car-item">
        <img :src="item.img" class="car-icon" />
        <div class="car-info">
          <span class="car-text">{{ item.userName }} {{ item.sex }}</span>
          <p>身份证号：{{ item.idNumber }}</p>
          <p>电话号码：{{ item.phone }}</p>
        </div>
        <div :class="{ 'car-status': true, 'status-out': item.status === '离场' }">
          {{ item.status }}
        </div>
      </div>
      <div class="car-action-buttons">
        <button class="car-action-button" @click="editPerson(item)">编辑</button>
        <button class="car-action-button delete-button" @click="deletePerson(item)">
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getPersonnelList } from "@/api/functions/user"
import type { PersonneArray } from '@/api/functions/user'
import { onLoad } from '@dcloudio/uni-app'

const persondata = ref<PersonneArray>([])

const getData = async (bidCode: string) => {
  getPersonnelList(bidCode).then((res) => {
    persondata.value = res.data;
    console.log(persondata.value, 'persondata');
  })
};

const editPerson = (personitem: any) => {
  // 在此处编写编辑车辆信息的逻辑
  console.log("编辑车辆:", personitem);
};
const deletePerson = (personitem: any) => {
  // 在此处编写删除车辆信息的逻辑，例如弹窗确认、API调用等
  console.log("删除车辆:", personitem);
};
onLoad((query) => {
  getData(query?.bidCode);
});
</script>

<style lang="scss" scoped>
.car-item {
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

  .car-icon {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .car-info {
    flex: 1;

    .car-text {
      font-weight: bold;
      color: #333;
    }

    p {
      margin-top: 10px;
      font-size: 0.9rem;
      color: #666;
    }
  }

  .car-status {
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

.car-action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  /* 根据需要调整右侧边距 */

  .car-action-button {
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
</style>
