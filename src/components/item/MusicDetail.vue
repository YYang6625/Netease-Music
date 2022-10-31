<template lang="">
  <img class="img" :src="MusicListItem.playList.al.picUrl" alt="" />
  <div class="MusicDetail">
    <!-- 详情头部 -->
    <div class="detail-top">
      <div class="left">
        <svg
          class="icon"
          aria-hidden="true"
          @click="MusicListItem.getMusicDetail"
        >
          <use xlink:href="#icon-xiangxia"></use>
        </svg>
      </div>
      <div class="middle">
        <div class="song-name">{{ MusicListItem.playList.name }}</div>
        <div class="song-author">{{ MusicListItem.playList.ar }} ></div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <!-- 需要复制要使用的字体图标代码 -->
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 详情中部 -->
    <div class="detail-middle" v-show="isLyricShow" @click="changeisLyricShow">
      <div class="circle">
        <img
          class="img_animation"
          :src="MusicListItem.playList.al.picUrl"
          alt=""
          :class="{ img_active: paused, img_paused: !paused }"
        />
      </div>
    </div>
    <!-- 歌词部分 -->
    <!-- 1.利用计算属性对歌词进行处理，过于麻烦(不建议使用,有时报错有时不报错，报错split不是一个函数) -->
    <div
      class="musicLyric"
      v-show="!isLyricShow"
      @click="changeisLyricShow"
      ref="musicLyric"
    >
      <!-- item.time表示的是当前歌词的开始时间，item.next表示下一句歌词开始 -->
      <!-- currentTime指的是audio返回的正在播放时的时间 -->
      <p
        v-for="item in changeLyric"
        :key="item"
        :class="{
          active:
            MusicListItem.playList.currentTime * 1000 >= item.time &&
            MusicListItem.playList.currentTime * 1000 < item.next,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 详情底部 -->
    <div class="detail-bottom">
      <div class="top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changge"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <!-- 进度条   (主要使用min最小值和max最大值属性，并双向绑定当前的时间用以控制进度 (将时间传递给store中再使用建立联系)-->
      <!-- 注意总时长是需要动态绑定store中的总时长，才能读取变量 -->
      <div class="middle">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="MusicListItem.playList.currentTime"
          step="0.05"
        />
      </div>
      <!-- 底部播放详情 -->
      <div class="bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang-xunhuanbofang-copy"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="MusicListItem.prveMusicItem()"
        >
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <!-- 获取传递过来的paused即可，两个组件的状态是一致的 -->
        <svg
          class="icon bigger"
          aria-hidden="true"
          v-if="!paused"
          @click="play"
        >
          <use xlink:href="#icon-bofang1-copy"></use>
        </svg>
        <svg class="icon bigger" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="MusicListItem.nextMusicItem()"
        >
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiaoguanli-copy"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { useMusicListItem } from "../../store/index.ts";
export default {
  props: ["play", "paused"],
  beforeUpdate() {
    this.duration = this.MusicListItem.playList.duration;
  },
  data() {
    return {
      MusicListItem: useMusicListItem(),
      isLyricShow: false, //是否显示歌词
      lyricList: useMusicListItem().playList.lyricList,
      duration: null,
    };
  },
  //歌词处理
  computed: {
    // 1.处理歌词，将每一行作为一个item，再进行切割，将不需要的一部分切割掉(split，slice，map)
    changeLyric() {
      if (this.MusicListItem.playList.lyricList) {
        let arr = null;
        arr = this.MusicListItem.playList.lyricList
          .split(/[(\r\n)\r\n)]+/) //split(/\n/igs)也是将换行符作为标识的含义
          .map((item, i) => {
            //获取分，秒，毫秒，slice数组方法 包头不包尾
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 9);
            // 获取每句歌词
            let lrc = item.slice(11, item.length);
            // 将事件进行处理(转化成毫秒进行比较，最后一句没有时间显示NAN)
            let time =
              // 分变秒
              parseInt(min) * 60 * 1000 +
              // 秒变毫秒
              parseInt(sec) * 1000 +
              parseInt(mill);
            //作为对象属性返回
            return { lrc, min, sec, mill, time };
          });
        // 利用forEach对内部每一个歌词添加属性next表示下一句开始的时间
        arr.forEach((item, i) => {
          // 到达最后一句
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 100000; //如果为0，最后一句没有样式(样式显示条件不成立)
          } else {
            // 设置属性next表示下一句话的时间(可以知道最后一句之后就没有下一句，next=NAN)
            item.next = arr[i + 1].time;
          }
        });
        // 查看返回的数组
        // console.log(arr);
        return arr;
      }
    },
  },
  methods: {
    // 切换歌词显示页面
    changeisLyricShow() {
      this.isLyricShow = !this.isLyricShow;
    },
  },
  watch: {
    //歌词样式始终显示中在中间，利用监听当时间改变时，利用高亮p标签的offsetTop改变滚动条scroll
    "MusicListItem.playList.currentTime": {
      deep: true,
      handler() {
        //定义高亮的p标签变量
        let p = document.querySelector("p.active");
        // 查看有样式p标签内部的一些属性以及属性offsetTop设置歌词居中 [p]变成数组
        // console.log([p]);
        if (p) {
          if (p.offsetTop > 230) {
            // 使高亮的p标签一直处于中间位置
            this.$refs.musicLyric.scrollTop = p.offsetTop - 240;
          }
        }
        if (
          this.MusicListItem.playList.currentTime ==
          // 这里发现还是不能使用data存储总时长，留下的上一次的数据，获取不到更新之后的数据
          // 所以使用声明周期函数去获取最新数据
          this.duration
        ) {
          this.MusicListItem.nextMusicItem();
          // 将歌词滚动置零回顶部
          this.$refs.musicLyric.scrollTop = 0;
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.icon {
  fill: #fff;
}

.img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(20px);
}
// 整体样式
.MusicDetail {
  position: relative;
  margin: auto 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 10px #fff;
  background-color: rgba(0, 0, 0, 0.5);

  .detail-top {
    display: flex;
    position: absolute;
    top: 0;
    height: 10%;
    line-height: 1.5rem;
    width: 100%;
    justify-content: space-between;
    padding: 0 25px;
    .middle {
      width: 50%;
    }

    .song-name,
    .song-author {
      height: 50%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .song-name {
      line-height: 1.2rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: #fff;
    }

    .song-author {
      line-height: 0.5rem;
      font-size: 0.25rem;
      color: rgb(214, 143, 143);
    }
  }
  .detail-middle {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 65%;

    .circle {
      position: absolute;
      background-color: pink;
      width: 4rem;
      height: 4rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 5px solid pink;
      overflow: hidden;

      // 圆环外圈的发光效果（还待研究）
      //   .circle::before{
      //     content: "";
      //     position: absolute;
      //     border-radius: 50%;
      //     width: 4rem;
      //     height: 4rem;
      //     background-image: linear-gradient(
      //       0deg,
      //       rgb(47, 102, 255),
      //       rgb(153, 64, 255),30%,
      //       rgb(238, 55, 255),60%,
      //       rgb(255, 0, 76) 100%);
      //       z-index: 20;
      //       filter: blur(16px);
      //   }
      .img_animation {
        width: 100%;
        height: 100%;
        animation: rotate 25s linear infinite;
      }

      //   控制动画的暂停和播放
      .img_active {
        animation-play-state: running;
      }

      .img_paused {
        animation-play-state: paused;
      }

      //   添加旋转动画效果
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  // 歌词数据样式
  .musicLyric {
    display: flex;
    position: absolute;
    top: 12%;
    width: 100%;
    height: 60%;
    // 方向改变，只有一列要居中使用align-items
    // 分享没改变，则是一行或者多行 align-content
    flex-direction: column;
    align-items: center;
    // 溢出滚动
    overflow: scroll;
    text-align: center;
    padding: 0 0.4rem;
    p {
      width: 100%;
      // 增大高度，能放下两行
      height: 1.8rem;
      // 行高为一半 控制一页放下的歌词行数
      line-height: 0.9rem;
      color: rgb(228, 228, 228);
      font-size: 0.32rem;
    }
    .active {
      color: aqua;
    }
  }
  .detail-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%;
    padding: 0 0.5rem;

    .top {
      display: flex;
      height: 20%;
      justify-content: space-between;
      align-items: center;
    }

    .middle {
      width: 100%;
      height: 1rem;
      line-height: 1.3rem;
      text-align: center;
      .range {
        width: 100%;
        height: 0.06rem;
      }
    }

    .bottom {
      display: flex;
      width: 100%;
      height: 50%;
      justify-content: space-between;
      align-items: center;

      .bigger {
        width: 1rem;
        height: 1rem;
      }

      .icon {
      }
    }
  }
}
</style>
