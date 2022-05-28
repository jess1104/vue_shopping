<template>
  <FrountNavbar></FrountNavbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import FrountNavbar from "@/components/FrountNavbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    FrountNavbar,
    Footer,
  },
};
</script>
