<template>
  <!-- 引入導覽列 -->
  <Navbar></Navbar>
  <!-- 這個router-view是吃Dashboard.vue裡的子路由Products.vue -->
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
// 區域註冊
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    // 註冊了記得要使用不然會噴錯
    Navbar,
  },
  created() {
    // 取出cookie的token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    // 寫入header
    this.$http.defaults.headers.common.Authorization = token;
    // 檢查Authorization是否正確check的api
    const api = `${process.env.VUE_APP_URL}/api/user/check`;
    this.$http
      .post(api, this.user)
      .then((res) => {
        // console.log(res);
        if (!res.data.success) {
          alert(res.data.message);
          // this.$router.push("/login");
        }
      })
      .catch((err) => {
        // 要拿到err資訊要加response
        alert(err.response.data.message);
        this.$router.push("/login");
      });
  },
};
</script>

<style></style>
