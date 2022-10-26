// 首页请求
import service from "..";
// 获取首页轮播图数据
// service就是axios实例，调用函数就是发起请求
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner",
  });
}

// 发现好歌单请求
export function getMusicList() {
  return service({
    method: "GET",
    //这里我们传递一个参数4，获取4个歌单
    url: "/personalized?limit=10",
    withCredentials: true,
  });
}

// 搜索接口
export function searchMusic(data) {
  return service({
    method: "GET",
    //这里我们传递一个参数4，获取4个歌单
    url: `/cloudsearch?keywords=${data}`,
    withCredentials: true,
  });
}

// 登录
export function getPhoneLogin(data) {
  return service({
    method: "GET",
    //这里我们传递一个参数4，获取4个歌单
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    withCredentials: true,
  });
}

// 获取用户数据
export function getLoginUser(data) {
  return service({
    method: "GET",
    //这里我们传递一个参数4，获取4个歌单
    url: `/user/detail?uid=${data}`,
    withCredentials: true,
  });
}