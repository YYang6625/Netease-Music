<!-- 歌单歌曲详情头部 -->
<template lang="">
  <!-- 顶部 -->
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="Top-left">
      <!-- 利用路由方法go返回之前页面 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <!-- 需要复制要使用的字体图标代码 -->
        <use xlink:href="#icon-zuojiantou-copy-copy"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="Top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>

  <!-- 顶部中间唱片部分 -->
  <div class="itemMusicMiddle">
    <div class="Middle-left">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yunhang-copy"></use>
        </svg>
        <span>{{ changePlayCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="Middle-right">
      <div class="right-top">{{ playlist.name }}</div>
      <div class="right-middle">
        <!-- 这里显示的是歌单作者的头像和名字，但是由于经常请求失败，就注销不现实 -->
        <!-- <img :src="playlist.creator.avatarUrl" alt="" /> -->
        <!-- <span>{{ playlist.creator.nickname }}</span> -->
        <svg class="icon" aria-hidden="true">
          <!-- 需要复制要使用的字体图标代码 -->
          <use xlink:href="#icon-youjiantou-copy-copy"></use>
        </svg>
      </div>
      <div class="right-bottom">
        <span>
          {{ playlist.description }}
        </span>
        <svg class="icon" aria-hidden="true">
          <!-- 需要复制要使用的字体图标代码 -->
          <use xlink:href="#icon-youjiantou-copy-copy"></use>
        </svg>
      </div>
    </div>
  </div>

  <!-- 顶部底部 -->
  <div class="itemMusicBottom">
    <div>
      <svg class="icon" aria-hidden="true">
        <!-- 需要复制要使用的字体图标代码 -->
        <use xlink:href="#icon-shouye"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-duoxuankuang"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>
<script>
import { mixinFuc } from "../../mixin.js";
export default {
  setup(props) {
    // 查看父传子传递过来的数据
    // console.log(props);
  },
  // props接收父组件路由传递过来的参数
  props: ["playlist"],
  mixins: [mixinFuc],
};
</script>
<style lang="less" scoped>
.icon {
  fill: #fff;
}
// 顶部样式
.itemMusicTop {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  //对图标进行修改利用fill填充色
  .icon {
    fill: aqua;
  }
  .Top-left,
  .Top-right {
    display: flex;
    width: 25%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 12rem;
    position: absolute;
    // 层叠在下面
    z-index: -1;
    // 虚化背景
    filter: blur(15px);
  }
}
// 中间部分
// 这里写样式时，写了margin，使得盒子往外撑开了，影响后面所有布局(下次注意)
.itemMusicMiddle {
  display: flex;
  padding: 0 9px;
  width: 100%;
  height: 3rem;
  margin-bottom: 30px;
  justify-content: space-between;
  .icon {
    fill: #fff;
    width: 0.5rem;
    height: 0.5rem;
  }
  .Middle-left {
    position: relative;
    width: 35%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
    .playCount {
      display: flex;
      position: absolute;
      align-items: center;
      top: 0;
      right: 0.1rem;
      color: #fff;
      z-index: 999;
      font-size: 10px;
      .icon {
        width: 0.35rem;
      }
    }
  }
  .Middle-right {
    display: flex;
    width: 62%;
    flex-direction: column;
    justify-content: space-between;
    .right-top {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
    .right-middle {
      display: flex;
      width: 100%;
      height: 30%;
      font-size: 16px;
      align-items: center;
      color: #fff;
      img {
        border-radius: 50%;
        width: 11%;
        height: 2px;
        padding: 5px;
      }
    }
    .right-bottom {
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      height: 0.72rem;
      span {
        position: relative;
        width: 210px;
        height: 100%;
        padding-right: 5px;
        color: #eee;
      }
      span::before {
        content: "";
        display: block;
      }
      span::after {
        content: "...";
        display: block;
        position: absolute;
        bottom: -3px;
        right: -10px;
        margin-right: 14px;
      }
    }
  }
}
// 底部样式
.itemMusicBottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1rem;
  font-size: 14px;
  color: #fff;
  margin-bottom: 0.3rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      padding-top: 5px;
    }
  }
}
</style>
