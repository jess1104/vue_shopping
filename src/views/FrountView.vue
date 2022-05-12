<template>
  <FrountNavbar></FrountNavbar>
  <router-view></router-view>
</template>

<script>
import FrountNavbar from "@/components/FrountNavbar.vue";

export default {
  components: {
    FrountNavbar,
  },
};
</script>
