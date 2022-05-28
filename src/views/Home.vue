<template>
  <div class="home">
    <div class="position-relative mb-5 top-container">
      <div class="container d-flex flex-column" style="min-height: 100vh">
        <div class="row justify-content-center my-auto top-text">
          <div class="col-md-4 text-center">
            <h2>球鞋市集</h2>
            <p class="text-muted mb-2">最新最潮的球鞋就在Hao's Shop</p>
            <button class="btn btn-dark rounded-1 mt-6">
              <router-link to="/FrontProducts" class="text-decoration-none link-light">
                去商品
              </router-link>
            </button>
          </div>
        </div>
      </div>
      <div
        class="position-absolute cart"
        style="
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-image: url(https://images.unsplash.com/photo-1637666725970-53822683726a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170);
          background-position: center center;
          opacity: 0.1;
        "
      ></div>
    </div>
    <div class="container mt-5">
      <div data-aos="fade-right" data-aos-duration="1300" class="row">
        <div class="col-md-6">
          <img
            src="https://sneakernews.com/wp-content/uploads/2022/05/Balenciaga-adidas-Triple-S-White-Black-5.jpg"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">The Entire Balenciaga x adidas</h4>
          <p class="text-muted">
            In recent years, adidas has taken a keen interest in luxury, teaming up with brands like
            Prada and soon Gucci. And today, yet another Kering label, Balenciaga, has dropped their
            own collaborative collection, complete with a co-branded Triple S as well as a host of
            athletic apparel.
          </p>
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-duration="1300"
        class="row flex-row-reverse justify-content-between mt-4"
      >
        <div class="col-md-6">
          <img
            src="https://sneakernews.com/wp-content/uploads/2022/05/Nike-Air-Max-Terrascape-97-DJ5019-001-8.jpg?w=1140"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">Air Max Terrascape 97 Dresses Up In “Oreo” Colors</h4>
          <p class="text-muted">
            The Nike Air Max Terrascape 97 isn’t an entirely new silhouette, but the trail-inspired
            iteration of Christian Tresser’s 25-year-old design delivers a breath of fresh air to
            the Swoosh’s 1990s lineup.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
export default {
  name: "Home",
  mounted() {
    AOS.init({});
  },
};
</script>

<style scoped>
.cart {
  z-index: -100;
}
.top-container {
  height: 80vh;
}
.top-text {
  height: 40vh;
}
</style>
