<template>
  <div class="car">
    <div v-for="(item, index) in cars" :key="index">
      <div class="car-item">
        <img :src="item.img" class="car-icon" />
        <div class="car-info">
          <span class="car-text">{{ item.name }} {{ item.gender }}</span>
          <p>车牌号：{{ item.carId }}</p>
          <p>电话号码：{{ item.phoneId }}</p>
        </div>
        <div
          :class="{ 'car-status': true, 'status-out': item.status === '离场' }"
        >
          {{ item.status }}
        </div>
      </div>
      <div class="car-action-buttons">
        <button class="car-action-button" @click="editCar(item)">编辑</button>
        <button
          class="car-action-button delete-button"
          @click="deleteCar(item)"
        >
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Car",
  setup() {
    const cars = ref([
      {
        img: "/static/logo.png",
        name: "张三",
        gender: "男",
        carId: "皖A123456",
        phoneId: 132312314124,
        status: "在场",
      },
      {
        img: "/static/logo.png",
        name: "李四",
        gender: "男",
        carId: "皖A123456",
        phoneId: 153235123134,
        status: "离场",
      },
      {
        img: "/static/logo.png",
        name: "张三",
        gender: "男",
        carId: "皖A123456",
        phoneId: 132312314124,
        status: "在场",
      },
      {
        img: "/static/logo.png",
        name: "李四",
        gender: "男",
        carId: "皖A123456",
        phoneId: 153235123134,
        status: "离场",
      },
    ]);

    const editCar = (carItem: any) => {
      // 在此处编写编辑车辆信息的逻辑
      console.log("编辑车辆:", carItem);
    };
    const deleteCar = (carItem: any) => {
      // 在此处编写删除车辆信息的逻辑，例如弹窗确认、API调用等
      console.log("删除车辆:", carItem);
    };
    return {
      cars,
      editCar,
      deleteCar,
    };
  },
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
  margin-right: 1rem; /* 根据需要调整右侧边距 */

  .car-action-button {
    width: 55px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border: none;
    background-color: #13baa5; /* 背景颜色可自定义 */
    color: white;
    cursor: pointer;
    border-radius: 0;
    text-align: center;
    margin-left: 0.5rem; /* 按钮之间的间距 */
    margin: 0.5rem 0 1.5rem 10px;
  }
  .delete-button {
    background-color: red !important;
  }
}
</style>
