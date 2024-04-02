<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { postUserInfoAPI } from '@/api/login';
import { useInfoStore } from "@/stores";

onLaunch(() => {
  console.log("App Launch");
  postUserInfoAPI({
    "username": "guest",
    "password": "admin@123",
    "loginType": "3"
  }).then((res: any) => {
    if (res.code == 200) {
      const userStore = useInfoStore();
      userStore.setUserInfo({ token: res.data.access_token, userInfo: JSON.parse(res.data.us) })
      console.log(userStore.userinfo);

    }
  })
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
.uni-tabbar {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border: 0;
}
</style>
