<!-- 歌单详情页面组件 -->
<!-- 这是一个路由内部还需要跳转进入其他组件的组件，存放在views -->
<!-- 这个组件内的内容上部分和下部分不是同一个数据，另添加两个路由用于跳转 (item中的组件内容全都存放在item文件夹中)-->
<template lang="">
  <!-- 将请求的数据传递过去 -->
  <itemMusicTop :playlist="state.playlist" />
  <itemMusicList
    :tracks="state.playlist.tracks"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>
<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getMusicItem, getMusicItemList } from "@/request/api/musicItem.js";
import itemMusicTop from "@/components/item/itemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";

export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单详情数据
      itemList: [], //歌单列表数据
    });
    onMounted(async () => {
      // 可在函数中查看query等参数
      // 获取歌单详情
      let id = useRoute().query.id;
      // 打印歌单id
      // console.log(id);
      let res = await getMusicItem(id);
      // 查看歌单详情
      // console.log(res);
      state.playlist = res.data.playlist;
      // 查看列表
      // console.log(state.playlist);
      // 请求列表报错，无奈使用歌单中提供的20受歌trancks
      // console.log(state.playlist.tracks);

      // 获取歌单歌曲(失效报错)
      // let result = await getMusicItemList(id);
      // 获取歌单内歌曲
      // console.log(result);
      // state.itemList = result.data.songs;
      // 需要时再进行绑定数据
      // :itemList="state.itemList"
    });
    // 返回数据模板获取
    return { state };
  },
  components: {
    itemMusicTop,
    itemMusicList,
  },
};
</script>