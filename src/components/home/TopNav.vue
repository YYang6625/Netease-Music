<!-- 头部导航组件 -->
<template lang="">
  <div class="TopNav">
    <!-- 左边列表 -->
    <div class="topLeft">
      <!-- 引入字体图标 -->
      <svg class="icon" aria-hidden="true">
        <!-- 需要复制要使用的字体图标代码 -->
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>

    <!-- 中间 -->
    <div class="topCpntent">
      <span @click="$router.push('/infoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <!-- 右边搜索 -->
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <!-- 需要复制要使用的字体图标代码 -->
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>
<style lang="less" scoped>
.TopNav {
  display: flex;
  /* 主轴x轴，两边贴边后，其它盒子距离相等 */
  justify-content: space-between;
  /* 侧轴y轴居中 */
  align-items: center;
  width: 100%;
  height: 0.9rem;
  font-size: 0.36rem;
  padding: 0 0.2rem;
  .topCpntent {
    display: flex;
    // 剩余空间等分成每个盒子的边距
    justify-content: space-around;
    width: 70%;
    height: 100%;
    align-items: center;
    padding-bottom: 0.06rem;
  }
  .active {
    font-weight: 800;
  }
}
</style>
