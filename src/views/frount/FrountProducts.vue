<template>
  <!-- 讀取套件 -->
  <LoadingA :active="isLoading"></LoadingA>
  <!-- 選擇品牌導覽列 -->
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-center align-items-center d-flex"
  >
    <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="selectCategory('')"
        :class="{ active: brand === '' }"
        >| All |</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        @click.prevent="selectCategory('Nike')"
        href="#"
        :class="{ active: brand === 'Nike' }"
        >| Nike |</a
      >

      <a
        class="nav-item nav-link text-nowrap px-2"
        @click.prevent="selectCategory('Adidas')"
        href="#"
        :class="{ active: brand === 'Adidas' }"
        >| Adidas |</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        @click.prevent="selectCategory('New Balance')"
        href="#"
        :class="{ active: brand === 'New Balance' }"
        >| New Balance |</a
      >
    </div>
  </nav>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-12 col-md-3" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative position-relative">
          <img :src="product.imageUrl" class="card-img-top rounded-0" alt="..." />
          <div class="card-body p-0">
            <h6 class="mb-0 mt-3 hh">
              <router-link
                :to="`/FrountProduct/${product.id}`"
                class="text-decoration-none link-dark"
                >{{ product.title }}</router-link
              >
            </h6>
            <p class="mt-3">
              <strong>NT${{ product.price }}</strong
              ><span class="text-muted ms-1 small"
                ><del>NT${{ product.origin_price }}</del></span
              >
            </p>
            <div>
              <button
                type="button"
                class="btn btn-outline-secondary ms-1 w-100"
                @click.prevent="addToCart(product.id)"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將emitter.js匯入使用
import emitter from "@/methods/emitter";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      brand: "",
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
        });
    },
    // 加入購物車
    addToCart(id, qty = 1) {
      // this.isLoading = true;
      const data = {
        product_id: id,
        qty,
      };
      // console.log(data);
      this.$http
        .post(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          this.isLoading = false;
          // console.log(res);
          alert(res.data.message);
          // 傳給FrountNavbar去重撈加入購物車列表
          emitter.emit("get-cart");
        });
    },
    selectCategory(brand) {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products?category=${brand} `
        )
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.brand = brand;
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
.small {
  font-size: small;
}
.hh {
  height: 50px;
}
</style>
