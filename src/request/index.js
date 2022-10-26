// 请求的封装
import axios from "axios";
// 创建一个axios实例进行请求
let service = axios.create({
  baseURL: "http://localhost:3000/",
  // 跨域
  withCredentials: true,
  // 请求超时
  timeout: 5000,
});
export default service;
