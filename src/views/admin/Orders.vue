<template>
  <div>
    <LoadingA :active="isLoading" :z-index="1060"></LoadingA>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- 刪除產品元件 -->
    <DelModal :item="tempOrder" ref="delModal" @del-product="delOrder"></DelModal>
  </div>
</template>

<script>
import DelModal from "@/components/DelModal.vue";

export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    DelModal,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      const delComponent = this.$refs.delModal;
      console.log(this.$refs);
      delComponent.showModal();
    },
    // 刪除訂單
    delOrder() {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      console.log(api);
      this.isLoading = true;
      this.$http
        .delete(api)
        .then(() => {
          this.isLoading = false;
          alert("刪除此訂單");
          this.$refs.delModal.hideModal();
          this.getOrders();
        })
        .catch((error) => {
          this.isLoading = false;
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
