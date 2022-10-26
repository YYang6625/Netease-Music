// 设置跟母乳字体大小，控制rem
function remSize() {
  // 获取屏幕宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  // 移动端(超过750)
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  // 手机
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 1rem--》100px  3.75rem = 350px（一半）
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px";
  // rem（root em）:也就是根据html的根字体决定大小 比如html fontsize=14px 1rem=14px(html默认是16px)
  // em则是继承父元素的字体大小 1em 如果自己设置了先取自己的fontsize

  //设置body默认字体大小（30px）
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}

// 调用，个人觉得可以使用立即执行函数
remSize();

// 窗口变化调用字体
window.onresize = function () {
  remSize();
};
