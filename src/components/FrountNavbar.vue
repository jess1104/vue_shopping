<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand logo-1" to="/"
        ><img src="../assets/logo1.png" class="w-100" alt=""
      /></router-link>
      <!-- RWD漢堡條 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- navBar -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/FrontProducts">產品列表</router-link>
          </li>
        </ul>
        <button type="button" class="btn cart">
          <router-link class="text-black" to="/FrountCart">
            <i class="bi bi-cart4"></i>
            <span class="badge rounded-pill bg-danger cart-num">{{ cartData.carts.length }}</span>
          </router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
// 將emitter.js匯入使用
import emitter from "@/methods/emitter";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    // 拿到加入購物車的列表，主要要知道幾樣商品加入購物車了
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log(res);
          this.cartData = res.data.data;
        });
    },
  },
  mounted() {
    this.getCart();
    // emitter監聽行為都會放在mounted
    emitter.on("get-cart", () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.logo-1 {
  width: 150px;
}
.cart {
  position: relative;
  margin: 5px;
  .bi {
    font-size: 30px;
  }
  .cart-num {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
