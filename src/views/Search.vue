<template lang="">
  <!-- 搜索框 -->
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou-copy"></use>
    </svg>
    <input
      type="text"
      placeholder="请输入歌曲"
      v-model.trim="state.keyWord"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <div class="title" v-if="state.searchList">
      <span class="left">历史:</span>
      <span>
        <svg class="icon" aria-hidden="true" @click="deleteKeyWordList">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </span>
    </div>
    <div class="history">
      <span v-for="item in state.keyWordList" @click="searchHistory(item)">
        {{ item }}</span
      >
    </div>
  </div>
  <!-- 搜索歌曲列表 -->
  <div class="itemListTop" v-if="state.searchList.length">
    <div class="Top-left">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinpin"></use>
        </svg>
      </div>
      <!-- 左边 -->
      <div>
        歌单
        <!-- <span>(共20首)</span> -->
      </div>
    </div>
    <!-- 右边 -->
    <div class="Top-right">
      <span
        @click="
          MusicListItem.playAllMusic(state.searchList);
          MusicListItem.getMusicDetail();
        "
        >播放全部</span
      >
    </div>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in state.searchList" :key="item.id">
      <!-- 点击底部组左边调用store函数给改变状态显示音乐详情组件 -->
      <div
        class="item-left"
        @click="
          MusicListItem.getMusicItem(item, i, state.searchList);
          MusicListItem.getMusicDetail();
        "
      >
        <!-- 利用v-for 对i进行++操作，完成序列 -->
        <div class="item-creator">
          <div class="creator-song">
            {{ item.name }}
          </div>
          <div class="creator-name">
            <div v-for="(item, index) in item.ar" :key="index">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="item-right">
        <!-- v-if 当mv为零是，也就是false，不显示 -->
        <div v-if="item.mv">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import { searchMusic } from "@/request/api/home.js";
import { useMusicListItem } from "@/store/index.ts";
export default {
  data() {
    return {
      MusicListItem: useMusicListItem(),
    };
  },
  setup() {
    onMounted(() => {
      state.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
    });
    const state = reactive({
      keyWordList: [],
      keyWord: "",
      searchList: [],
    });
    async function enterKey() {
      if (state.keyWord != "") {
        // 小细节，添加到最前面，就会显示最新的数据
        state.keyWordList.unshift(state.keyWord);
        // 利用set数据结构对搜索历史进行去重
        state.keyWordList = [...new Set(state.keyWordList)];
        localStorage.setItem(
          "keyWordList",
          JSON.stringify(state.keyWordList) || []
        );
      }
      //  请求搜索(之前请求不到，原因是在请求之前就将keyword变成""，导致请求出错)
      //  事实证明reactive的数据的确是动态的
      let res = await searchMusic(state.keyWord);
      //  查看请求数据
      // console.log(res.data.result.songs);
      //将数据存储到store中(这里发现，只能使用useMusicListItem()，定义MusicListItem会变成这个组件的数据)
      // 无法实现修改store中列表，定义MusicListItem报错searchList未定义,且无法进行双向交互(但是在vue2中就可以)
      useMusicListItem().searchList = res.data.result.songs;
      // 定义一个歌曲列表数据供渲染页面使用
      state.searchList = useMusicListItem().searchList;
      //将请求框变回空白
      this.state.keyWord = "";
    }
    function deleteKeyWordList() {
      localStorage.removeItem("keyWordList");
      state.keyWordList = [];
    }
    // 点击搜索历史获取数据
    async function searchHistory(item) {
      let res = await searchMusic(item);
      useMusicListItem().searchList = res.data.result.songs;
      // console.log(useMusicListItem().searchList);
      state.searchList = useMusicListItem().searchList;
      // 小细节，添加到最前面，就会显示最新的数据
      state.keyWordList.unshift(item);
      // 利用set数据结构进行去重
      state.keyWordList = [...new Set(state.keyWordList)];
      localStorage.setItem(
        "keyWordList",
        JSON.stringify(state.keyWordList) || []
      );
    }
    return { state, enterKey, deleteKeyWordList, searchHistory };
  },
};
</script>
<style lang="less" scoped>
.searchTop {
  display: flex;
  width: 100%;
  height: 10%;
  padding: 0.2rem;
  align-items: center;
  input {
    height: 100%;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.1rem;
    margin-left: 0.2rem;
    border-radius: 0.5rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0 0.2rem;
  height: 3rem;
  overflow: hidden;
  .title {
    display: flex;
    width: 100%;
    height: 20%;
    margin-bottom: 0.05rem;
    justify-content: space-between;
    span {
      border-radius: 0.5rem;
      padding: 0.1rem;
      line-height: 0.4rem;
      text-align: center;
    }
    .left {
      background-color: #ddd;
    }
  }
  .history {
    width: 100%;
    height: 80%;
    padding: 0 0.2rem;
    text-align: center;
    overflow-y: scroll;
    padding: 0 0.1rem;
    span {
      float: left;
      border-radius: 0.5rem;
      margin-right: 0.4rem;
      padding: 0.1rem;
      background-color: #ddd;
      text-align: center;
      line-height: 100%;
      height: 22%;
      margin-bottom: 0.1rem;
    }
  }
}
.itemListTop {
  display: flex;
  background-color: #fff;
  padding: 0 0.15rem;
  width: 100%;
  height: 1rem;
  border-radius: 0.2rem 0.2rem 0 0;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  //   左边
  .Top-left {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 100%;
    font-weight: 700;
    .icon {
      fill: blue;
    }
    span {
      font-size: 12px;
      color: #ccc;
    }
  }
  //   右边
  .Top-right {
    height: 0.6rem;
    color: #fff;
    line-height: 0.6rem;
    background-color: red;
    border-radius: 0.8rem;
    span {
      padding: 0 0.08rem;
    }
  }
}
.itemList {
  padding-bottom: 1.2rem;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  line-height: 1.2rem;
  padding: 0 0.15rem;
  // 顶部左边
  .item-left {
    display: flex;
    height: 1.2rem;
    overflow: hidden;
    .item-creator {
      padding-left: 0.1rem;
      height: 1.2rem;
      .creator-song {
        font-size: 0.35rem;
        font-weight: 600;
        line-height: 0.8rem;
        width: 4.8rem;
        height: 0.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .creator-name {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.25rem;
        font-weight: 400;
        color: rgb(160, 85, 85);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  // 底部右边
  .item-right {
    display: flex;
    height: 100%;
    line-height: 100%;
    justify-content: space-around;
    align-items: center;
    div {
      padding: 0 0.2rem;
    }
    .icon {
      fill: black;
    }
  }
}
</style>
