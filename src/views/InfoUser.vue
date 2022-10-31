<!-- 个人用用户界面 -->
<template lang="">
  <div class="infoUser">
    <div class="userTop">
      <div class="topF">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
      </div>
      <div class="topT">
        <div class="circle">
          <img :src="user.data.profile.avatarUrl" alt="" />
        </div>
        <div class="box">
          <div class="author">{{ user.data.profile.nickname }}</div>
          <div class="authorMessage">
            <span class="following">{{ user.data.profile.follows }}关注</span>
            <span class="fan">{{ user.data.profile.followeds }}粉丝</span>
            <span class="leave">Lv{{ user.data.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useMusicListItem } from "@/store/index.ts";
export default {
  data() {
    return {
      MusicListItem: useMusicListItem(),
      user: JSON.parse(localStorage.getItem("user")) || useMusicListItem().user,
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.infoUser {
  padding: 0.2rem;
}
.userTop {
  .topF {
    display: flex;
    justify-content: space-between;
  }
  .topT {
    width: 100%;
    height: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
    .circle {
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.3rem;
      height: 1.3rem;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .box {
    margin: 1.2rem 0;
    width: 100%;
    height: 2rem;
    border-radius: 0.3rem;
    text-align: center;
    background-color: rgb(246, 246, 246);
    padding-top: 0.6rem;
    .author {
      font-size: 0.4rem;
      font-weight: 600;
    }
    .authorMessage {
      margin-top: 0.2rem;
      color: rgb(138, 133, 133);
      span {
        padding-right: 0.2rem;
      }
      .following::after,
      .fan::after {
        content: "丨";
        display: inline-block;
        width: 1px solid rgb(138, 138, 138);
        padding-left: 0.2rem;
      }
    }
  }
}
</style>
