<!-- 歌单歌曲详情列表 -->
<template lang="">
  <div class="itemListTop">
    <div class="Top-left">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinpin"></use>
        </svg>
      </div>
      <!-- 左边 -->
      <div>
        播放全部
        <span>(共20首)</span>
      </div>
    </div>
    <!-- 右边 -->
    <div class="Top-right">
      <span class="bigger">+</span>
      <span>收藏({{ subscribedCount }})</span>
    </div>
  </div>
  <div class="itemList" >
    <div class="item" v-for="(item, i) in tracks" :key="item.id">
    <!-- 点击底部组左边调用store函数给改变状态显示音乐详情组件 -->
      <div class="item-left" @click="MusicListItem.getMusicItem(item,i,tracks);MusicListItem.getMusicDetail()">
        <!-- 利用v-for 对i进行++操作，完成序列 -->
        <span class="item-num">{{ i + 1 }}</span>
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

<script setup>
import { useMusicListItem } from "../../store/index.ts";
const MusicListItem = useMusicListItem();
const props = defineProps(["itemList", "subscribedCount", "tracks"]);
</script>

<style lang="less" scoped>
// 顶部样式
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
    width: 40%;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 0.1rem;
    height: 0.8rem;
    color: #fff;
    line-height: 0.8rem;
    background-color: red;
    border-radius: 0.8rem;
    span {
      padding: 0 0.08rem;
    }
    .bigger {
      font-size: 0.5rem;
    }
  }
}
// 底部组件
.itemList{
  padding-bottom:1.2rem
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
    .item-num {
      font-size: 0.32rem;
      width: 0.3rem;
      color: rgb(85, 85, 85);
    }
    .item-creator {
      padding-left: 0.3rem;
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