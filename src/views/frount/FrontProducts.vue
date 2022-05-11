<template>
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
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>
