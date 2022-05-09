<template>
  <div class="text-end">
    <div class="btn btn-primary" type="button" @click="openModal(true)">新增一個產品</div>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @del-product="delProduct"></DelModal>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";

export default {
  data() {
    return {
      pageName: "產品列表",
      products: [],
      pagination: {},
      tempProduct: {
        // 多圖
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
  },
  methods: {
    // 資料表
    getProducts() {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products`;
      console.log(api);
      this.$http.get(api).then((res) => {
        console.log(res.data);
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        // 先清空tempProduct
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      // const { productModal } = this.$refs;
      // productModal.showModal();
      this.$refs.productModal.showModal();
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    updateProduct(item) {
      // console.log(item);
      // productModal獲得的資訊為item
      this.tempProduct = item;
      // 新增的api
      let api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";

      // 如果不是新的，為修改api
      if (!this.isNew) {
        api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          console.log(res);
          // 關掉productModal
          this.$refs.productModal.hideModal();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delProduct() {
      // console.log(this.tempProduct);
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((response) => {
        alert(response.data.message);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
