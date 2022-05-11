<template>
  <h2>產品內頁</h2>
  <div class="container">
    {{ product }}
    <img :src="product.imageUrl" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProduct() {
      console.log(this.$route);
      const { id } = this.$route.params;
      this.$http(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`).then(
        (res) => {
          this.product = res.data.product;
        }
      );
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
