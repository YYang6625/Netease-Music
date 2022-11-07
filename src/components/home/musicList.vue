<!-- 发现歌单组件 -->
<template lang="">
  <div class="musicList">
    <!-- 歌单上部分 -->
    <div class="musicList-Top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <!-- 歌单下部分 -->
    <div class="musicList-bottom">
      <!-- 使用vant组件库 -->
      <!-- 关闭轮播小图标（要动态绑定） -->
      <van-swipe
        :loop="true"
        :width="130"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="playlist in musicList"
          :key="playlist"
          style="width: 130px"
        >
          <router-link :to="{ path: '/musicitem', query: { id: playlist.id } }">
            <img :src="playlist.picUrl" alt="" />
            <!-- 播放量 -->
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yunhang-copy"></use>
              </svg>
              <span>{{ changePlayCount(playlist.playCount) }}</span>
            </span>
            <!-- 歌单标题 -->
            <span class="name">{{ playlist.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusicList } from "@/request/api/home.js";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { mixinFuc } from "../../mixin.js";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async MusicList() {
      let res = await getMusicList();
      // console.log(res);
      this.musicList = res.data.result;
    },
    // 将函数传递放到标签内使用即可
    // changePlayCount(num) {
    //   if (num > 100000000) {
    //     return (num / 100000000).toFixed(1) + "亿"; //取小数后一位
    //   } else if (num > 10000) {
    //     return (num / 10000).toFixed(1) + "万"; //取小数后一位
    //   }
    // },
  },
  mixins: [mixinFuc],
  // 在生命周期中去发送请求
  mounted() {
    this.MusicList();
  },
  // vue3写法
  // setup(){
  //   const state = reactive({
  //     musicList:[]
  //   })
  //   onMounted(async() => {
  //     let res = await getMusicList();
  //     state.musicList = res.data.result;
  //   })
  //   return { state,changePlayCount };
  // }
};
</script>
<style lang="less" scoped>
.musicList {
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
  .musicList-Top {
    display: flex;
    margin-bottom: 0.5rem;
    padding: 0 0.2rem;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 0.5rem;
      font-weight: 700;
    }

    .more {
      margin-left: 0.2rem;
      text-align: center;
      line-height: 0.5rem;
      width: 1.5rem;
      height: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
    }
  }
  .musicList-bottom {
    width: 100%;
    height: 4rem;
    img {
      width: 100%;
      height: 130px;
      border-radius: 0.2rem;
    }
    .icon {
      width: 0.35rem;
      color: #fff;
      padding-top: 2px;
    }
    .my-swipe {
      display: flex;
      height: 100%;
      .van-swipe-item {
        //页面中查看样式可知van-swipe-item代表每一个内的盒子
        border-radius: 0.2rem;
        padding: 0 0.1rem;
        .playCount {
          display: flex;
          position: absolute;
          align-items: center;
          top: 0;
          right: 0.2rem;
          z-index: 999;
          font-size: 10px;
          color: #fff;
        }
        .name {
          text-align: center;
          line-height: 100%;
          font-size: 0.26rem;
          color: aqua;
        }
      }
    }
  }
}
</style>
