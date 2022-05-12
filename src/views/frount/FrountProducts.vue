<template>
  <LoadingA :active="isLoading"></LoadingA>
  <h1>產品列表</h1>
  <div class="container">
    <!-- row決定一列有幾個 -->
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">原價:{{ product.origin_price }}特價:{{ product.price }}</p>
            <router-link :to="`/FrountProduct/${product.id}`" class="btn btn-primary"
              >去商品</router-link
            >
            <a href="#" class="btn btn-info" @click.prevent="addToCart(product.id)">加入購物車</a>
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
    };
  },
  methods: {
    getProducts() {
      this.$http
        .get(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        });
    },
    // 加入購物車
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const data = {
        product_id: id,
        qty,
      };
      console.log(data);
      this.$http
        .post(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          alert(res.data.message);
          // 傳給FrountNavbar去重撈加入購物車列表
          emitter.emit("get-cart");
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
