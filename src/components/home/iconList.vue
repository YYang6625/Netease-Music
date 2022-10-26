<!-- 轮播图下list组件 -->
<template>
  <div class="icon-list">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-beijingyinle"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paixingbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.icon-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.4rem 0;
  width: 100%;
  height: 1.5rem;
  .iconItem {
    display: flex;
    // 将主轴设置为y轴排布
    flex-direction: column;
    // 设置y轴后居中
    align-items: center;
    width: 25%;
    height: 100%;
    .icon {
      width: 1rem;
      height: 1rem;
    }
    span {
      font-size: 0.3rem;
      font-weight: 600;
      padding-top: .1rem;
    }
  }
}
</style>