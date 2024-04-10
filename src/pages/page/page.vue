<template>
  <div>
    <div class="my-info">
      <p>{{ deptName }}</p>
      <p>用户名：{{ roleName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useInfoStore } from "@/stores";
import { onShow, onHide } from '@dcloudio/uni-app'
let roleName = ref()
let deptName = ref()
onShow(() => {
  const userStore = useInfoStore()
  roleName.value = userStore.userinfo?.userInfo.roleName;
  deptName.value = userStore.userinfo?.userInfo.deptName;
})
onHide(() => {
})
</script>

<style lang="scss" scoped>
.my-info {
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-height: 83vh;

  p {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
}
</style>