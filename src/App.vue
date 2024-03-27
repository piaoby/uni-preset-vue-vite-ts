<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
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
