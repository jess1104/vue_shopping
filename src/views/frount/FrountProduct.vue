<template>
  <LoadingA :active="isLoading"></LoadingA>
  <div class="container">
    <div class="row align-items-center mt-4">
      <div class="col-md-7">
        <img class="w-100" :src="product.imageUrl" alt="" />
      </div>
      <div class="col-md-5">
        <h2 class="fw-bold h4 mb-4">{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p class="mb-0 text-muted text-end">
          <del>NT${{ product.origin_price }}</del>
        </p>
        <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                  @click="subtrac"
                >
                  <i class="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                :value="productCount"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                  @click="productCount++"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <a href="#" class="text-nowrap btn btn-dark w-100 py-2" @click.prevent="updateCartItem"
              >加入購物車</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ product }} -->
</template>

<script>
// 將emitter.js匯入使用
import emitter from "@/methods/emitter";

export default {
  data() {
    return {
      product: {},
      productCount: 1,
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      // console.log(this.$route);
      const { id } = this.$route.params;
      this.$http(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`).then(
        (res) => {
          this.isLoading = false;
          this.product = res.data.product;
        }
      );
    },
    subtrac() {
      if (this.productCount > 1) {
        this.productCount--;
      }
    },
    // 加入購物車(數量)
    updateCartItem() {
      this.isLoading = true;
      // 這邊的id是產品ID
      const cart = {
        product_id: this.product.id,
        qty: this.productCount,
      };
      // console.log(cart);
      this.$http
        .post(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`, { data: cart })
        .then((res) => {
          this.isLoading = false;
          // console.log(res);
          alert(res.data.message);
          // 傳給FrountNavbar去重撈購物車列表
          emitter.emit("get-cart");
          this.$router.push("/FrountCart");
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
