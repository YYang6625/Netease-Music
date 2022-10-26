<!-- 登录页面 -->
<template lang="">
  <img src="../../public/neteasemusic.png" alt="" />
  <div class="Login">
    <div class="LoginTop">网易云音乐</div>
    <div class="loginContent">
      <label for="phone"> 手机号: </label>
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号"
        id="phone"
      />
      <br />
      <label for="password"> 密码: </label>
      <input
        type="password"
        name="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
        id="password"
      />
      <br />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>
<script>
import { useMusicListItem } from "@/store/index.ts";
import { getLoginUser } from "@/request/api/home.js";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    // 由于请求是异步的，我们需要获取请求的数据，使用需要使用async函数等待请求完成接收数据
    async Login() {
      let res = await useMusicListItem().getLogin({
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        useMusicListItem().isLogin = true;
        useMusicListItem().token = res.data.token;
        // 请求用户详情
        let userDetail = await getLoginUser(res.data.account.id);
        //保存至本地就不需要每次登录(利用路由判断仓库和本地是否储存)
        localStorage.setItem("token", res.data.token);
        this.$router.push("/infoUser");
        // 将用户数据保存至store
        useMusicListItem().user = userDetail;
        localStorage.setItem("user", JSON.stringify(userDetail));
      } else {
        alert("手机号或密码错误！");
        // 清空密码
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
}
.LoginTop {
  position: absolute;
  width: 100%;
  top: 15%;
  font-size: 1rem;
  text-align: center;
  color: #fff;
}
.loginContent {
  position: absolute;
  top: 55%;
  left: 10%;
  width: 100%;
  color: #fff;
  font-size: 0.35rem;
  font-weight: 600;
  input {
    border: none;
    border-radius: 0.15rem;
    padding-left: 0.1rem;
    margin-left: 0.2rem;
    margin-bottom: 0.3rem;
    height: 0.6rem;
    font-weight: 400;
    z-index: 99;
    color: black;
  }
  .password {
    margin-left: 0.54rem;
  }
  .btn {
    margin-top: 0.4rem;
    margin-left: 2rem;
    padding: 0.2rem 0.6rem;
    font-size: 0.4rem;
    border: none;
    background-color: rgb(110, 110, 170);
    border-radius: 0.5rem;
  }
}
</style>
