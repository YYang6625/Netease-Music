// 引入创建数据库方法
import { defineStore } from "pinia";
// 如果暴露不是默认暴露
import { getMusicItemLyric } from "@/request/api/musicItem.js";
import { getPhoneLogin } from "@/request/api/home.js";

export const useMusicListItem = defineStore("MusicListItem", {
  state: () => {
    return {
      playList: {
        al: {
          id: 8521,
          name: "New Pattern",
          pic: 109951165264448460,
          picUrl:
            "https://p1.music.126.net/JRGm95lXIy27tDAivh4ocA==/109951165264448471.jpg",
          pic_str: "109951165264448471",
          ar: null,
        },
        id: 1410647903,
        paused: false,
        name: null, //歌曲名
        isShow: false, //底部组件的显示
        MusicDetailShow: false, //歌曲详情展示
        lyricList: null, //保存当前歌曲的歌词
        // (发现，当保存为对象或者数组时，在对歌词数据进行处理时显示split不是一个函数，也应该就是对象类型上是没有这个方法的，需要改成null或者空字符串)
        // 歌词开始事件
        currentTime: 0,
        // 歌曲总时长
        duration: 0,
      },
      tracks: null,
      musicListIndex: 0,
      // 搜索请求数据
      searchList: null,
      // 用户是否登录
      isLogin: false,
      // 令牌(有token就不需要账号密码)
      token: null,
      // 用户信息
      user: {},
    };
  },
  getters: {},
  actions: {
    // 调用store函数传递当前需要播放的歌
    // 当前歌曲数据
    getMusicItem(item, index, data) {
      this.playList.al = item.al;
      this.playList.ar = item.ar[0].name; //底部组件歌手(现只显示一个歌手，后期进行优化)
      this.playList.id = item.id;
      this.playList.name = item.name;
      this.playList.isShow = true;
      this.tracks = data;
      this.musicListIndex = index;
      // 查看传递过来的歌单歌曲列表
      // console.log(this.tracks);
    },

    // 控制详情页的显示
    getMusicDetail() {
      this.playList.MusicDetailShow = !this.playList.MusicDetailShow;
    },

    // 获取歌词请求并存储数据
    async getMusicLyric(id) {
      let dataLyric = await getMusicItemLyric(id);
      //先里利用变量接收数据，在接收歌词列表
      this.playList.lyricList = dataLyric.data.lrc.lyric;
      // 查看接收的数据
      // console.log(dataLyric);
      // 查看歌词
      // console.log(this.playList.lyricList);
    },

    // 接收传递过来audio timeupdata周期性事件传递过来的时间
    changeMusicLyric(Time) {
      this.playList.currentTime = Time;
      // 查看传递过来的时间更新
      // console.log(this.playList.currentTime);
    },

    // 获取点击歌曲的总时长
    getDuration(duration) {
      this.playList.duration = duration;
      // 查看总时长是否成功传递
      // console.log(this.playList.duration);
    },

    // 下一首(由于数据在之前请求报错,采取的对象形式存储,并不是存储的歌单,而是具体歌曲,非常麻烦,store最后存储整个数据,方便对具体数据修改,也方便整体数据修改)
    nextMusicItem() {
      // 代理对象内部是一个数组的话虽然不能使用数组方法，因为是一个代理对象
      // 但是居然可以直接使用下标
      if (this.musicListIndex == this.tracks.length - 1) {
        //先判断是否是最后一首
        this.musicListIndex = -1;
      } else {
        this.musicListIndex++;
      }
      this.playList.al = this.tracks[this.musicListIndex].al;
      this.playList.ar = this.tracks[this.musicListIndex].ar[0].name; //底部组件歌手(现只显示一个歌手，后期进行优化)
      this.playList.id = this.tracks[this.musicListIndex].id;
      this.playList.name = this.tracks[this.musicListIndex].name;
      // 查看上一首
      // console.log(this.tracks[this.musicListIndex - 1]);
    },

    // 上一首
    prveMusicItem() {
      // 先判断是否是第一首
      if (this.musicListIndex == 0) {
        this.musicListIndex = this.tracks.length;
        // console.log(this.musicListIndex);
      } else {
        this.musicListIndex--;
        // console.log(this.musicListIndex);
      }
      this.playList.al = this.tracks[this.musicListIndex].al;
      this.playList.ar = this.tracks[this.musicListIndex].ar[0].name; //底部组件歌手(现只显示一个歌手，后期进行优化)
      this.playList.id = this.tracks[this.musicListIndex].id;
      this.playList.name = this.tracks[this.musicListIndex].name;
    },

    // 搜索歌曲后播放全部
    playAllMusic(searchList) {
      this.playList.al = searchList[0].al;
      this.playList.ar = searchList[0].ar[0].name; //底部组件歌手(现只显示一个歌手，后期进行优化)
      this.playList.id = searchList[0].id;
      this.playList.name = searchList[0].name;
      this.playList.isShow = true;
      this.tracks = searchList;
    },

    // 登录请求获取用户数据
    async getLogin(data) {
      let res = await getPhoneLogin(data);
      // 返回数据给组件
      return res;
    },
  },
});
