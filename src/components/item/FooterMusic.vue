<template lang="">
  <!-- 利用v-if控制底部组件是否展示 -->
  <div class="FooterMusic" v-if="MusicListItem.playList.isShow">
    <!-- 点击底部组左边调用store函数给改变状态显示组件 -->
    <div class="left" @click="MusicListItem.getMusicDetail">
      <img :src="MusicListItem.playList.al.picUrl" alt="" />
      <div class="content">
        <div class="title">{{ MusicListItem.playList.name }}</div>
        <div class="author-name">{{ MusicListItem.playList.ar }}</div>
      </div>
    </div>
    <div class="right">
      <!-- 调用播放函数并改变字体图标暂时状态 -->
      <svg class="icon" aria-hidden="true" v-if="!paused" @click="play">
        <!-- 需要复制要使用的字体图标代码 -->
        <use xlink:href="#icon-play"></use>
      </svg>
      <!-- 利用播放的暂停来控制是否显示 -->
      <svg class="icon" aria-hidden="true" v-else="paused" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
  <!-- muted是由于浏览器不允许自动播放而需要设置的，当跳转歌曲时，我们再使其为null来实现自动播放 -->
  <audio
    @durationchange="durationChange"
    @timeupdate="timeChange"
    muted="muted"
    ref="audio"
    :src="`http://music.163.com/song/media/outer/url?id=${MusicListItem.playList.id}.mp3  `"
  ></audio>
  <van-popup
    v-model:show="MusicListItem.playList.MusicDetailShow"
    position="bottom"
    :style="{ height: '100%', width: '100%' }"
  >
    <!-- position:从哪弹出  style：内容样式设置 -->
    <!-- 利用父子组件关系同步播放和暂停效果 -->
    <MusicDetail :play="play" :paused="paused" />
  </van-popup>
</template>
<script>
import MusicDetail from "./MusicDetail.vue";
import { useMusicListItem } from "../../store/index.ts";
export default {
  // 数据更新就获取新的歌词
  // updated() {
  //   this.MusicListItem.getMusicLyric(this.id);
  // },
  data() {
    return {
      // 获取需要播放的歌曲数据
      MusicListItem: useMusicListItem(),
      id: useMusicListItem().playList.id,
      paused: useMusicListItem().playList.paused,
    };
  },
  methods: {
    play() {
      this.paused = !this.paused;
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.muted = null;
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    // 这里使用audio/video中的timeupdate事件调用函数(随时间变化调用函数，每秒触发 4-66 次)
    timeChange() {
      //调用store中的方法并将audio的current传递过去
      this.MusicListItem.changeMusicLyric(this.$refs.audio.currentTime);
    },
    // 利用audio中的audio总时长改变触发事件传递总时长(duration)给store
    durationChange() {
      this.MusicListItem.getDuration(this.$refs.audio.duration);
      // 查看总时长
      // console.log(this.$refs.audio.duration);
    },
  },
  // 利用监听属性，当播放的歌曲发生改变时，自动播放
  watch: {
    "MusicListItem.playList.id": {
      deep: true,
      handler() {
        if (this.paused == false) {
          this.$refs.audio.autoplay = true;
          this.$refs.audio.muted = null;
          this.paused = true;
        }
        // 当id改变时，也就是歌曲改变，获取新的歌词
        // (这里如果使用生命周期函数updated会重复请求，即点击播放就请求，不建议)
        this.MusicListItem.getMusicLyric(this.MusicListItem.playList.id);
        // console.log(this.id); //这里获取的是上一个留下的数据，而不是改变之后的数据
        // console.log(this.MusicListItem.playList.id);//这里获取的则是数据库中最新的数据(传递歌词明显需要使用最新数据)
      },
    },
  },
  components: {
    MusicDetail,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  position: fixed;
  display: flex;
  height: 1.2rem;
  width: 100%;
  bottom: 0;
  padding: 0 0.1rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 999;
  .left {
    display: flex;
    img {
      margin-top: 0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
    }
    .content {
      padding-left: 0.2rem;
      .title {
        font-size: 20px;
        height: 0.7rem;
        line-height: 0.9rem;
        width: 5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .author-name {
        height: 0.5rem;
        line-height: 0.3rem;
        font-size: 12px;
        width: 5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: rgb(160, 160, 160);
      }
    }
  }
  .right {
    display: flex;
    .icon {
      margin: 0 0.2rem;
    }
  }
}
</style>
