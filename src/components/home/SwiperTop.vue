<template>
  <div id="swiperTop">
    <van-swipe :autoplay="2500" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <!-- 图片地址是保存在pic中的 -->
        <img :src="image.imageUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ 是指src文件夹
import axios from "axios";
import { getBanner } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    // 将数据转化为响应式数据
    const state = reactive({
      images: [],
    });
    // 在组合式api生命周期函数获取banner轮播图数据
    onMounted(async () => {
      // 运行网易云接口获取url + 接口地址
      // 开发时和上线的域名是不一样的，就比如此时的是本地的

      // 1.未封装请求
      // axios.get("http://localhost:3000/banner").then((res) => {
      //   // 获取接口数据
      //   state.images = res.data.banners;
      // });

      // 2.封装请求并利用async协程等待异步数据
      let res = await getBanner();
      // 轮播图数据
      // console.log(res);
      state.images = res.data.banners;
    });
    // 返回数据，setup中暴露数据
    return { state };
  },
};
</script>

<style lang="less" scoped>
// 设置轮播样式
// 添加id避免冲突
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    // 周围撑开10px
    // 样式需要在页面中查看
    // 具体参数设置vant官网上可查询
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: orange;
    }
  }
}
</style>
