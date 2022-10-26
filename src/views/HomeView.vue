<template>
  <TopNav />
  <SwiperTop />
  <iconList/>
  <musicList/>
</template>

<script lang="ts">
// @ is an alias to /src
// 引入头部组件
import TopNav from "../components/home/TopNav.vue";
import SwiperTop from "../components/home/SwiperTop.vue";
import iconList from "../components/home/iconList.vue";
import musicList from "../components/home/musicList.vue";
export default {
  name: "Home",
  components: {
    TopNav,
    SwiperTop,
    iconList,
    musicList
  },
};
</script>
