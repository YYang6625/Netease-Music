// 插件遍历函数，当插件较多时方便统一管理
import { Swipe, SwipeItem, Popup, Progress } from "vant";

let plugins = [Swipe, SwipeItem, Popup];

export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
