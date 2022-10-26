// 歌单页面的请求
// 获取歌单详情
import service from "..";
// 接收传递过来的参数id值
export function getMusicItem(data) {
  return service({
    methods: "GET",
    //注意要加上id=,否则参数错误
    url: `/playlist/detail?id=${data}`,
  });
}

// 获取歌单列表栏内歌曲
export function getMusicItemList(data) {
  return service({
    method: "GET",
    //这里我们传递一个参数，获取歌单
    url: `/playlist/track/all?id=${data}`,
    withCredentials: true,
  });
}

// 获取播放歌曲歌词(接收id)
export function getMusicItemLyric(data) {
  return service({
    method: "GET",
    //这里我们传递一个参数，获取歌单
    url: `/lyric?id=${data}`,
    withCredentials: true,
  });
}
