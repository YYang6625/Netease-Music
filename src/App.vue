<template>
  <router-view />
  <!-- 全局组件：底部播放歌曲组件 -->
  <FooterMusic/>
</template>

<script>
import { FooterMusic } from "./components/item/FooterMusic.vue";
export default{
  components:{
    FooterMusic
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  /* 怪异和模型 */
  box-sizing: border-box;
}
/* 字体通标通用样式 */
/* 下载px自动转rem插件,需要去手动设置(@ext:cipchk.cssrem )根目录字体大小,这里设置的是五十 */
/* em表示父级目录下的字体大小，父级无就找根目录 */
.icon {
  width: 0.5rem;
  height: 0.5rem;
  overflow: hidden;
}
a {
  text-decoration: none;
}
</style>