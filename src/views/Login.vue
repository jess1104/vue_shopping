<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-secondary btn-block me-2" @click.prevent="$router.push('/')">前台首頁</button>
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // apiPath: process.env.VUE_APP_PATH,
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_URL}/admin/signin`;
      // console.log(api);
      // vue-axios
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            // 存入cookie
            // document.cookie =`自己命名的key=存入的值; expired=到期的時間;
            document.cookie = `hexToken=${token}; expired=${new Date(expired)}`;
            // console.log("存進cookie囉");
            this.$router.push("/dashboard/products");
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
          // 清空輸入框
          this.user.username = "";
          this.user.password = "";
        });
    },
  },
};
</script>

<style></style>
