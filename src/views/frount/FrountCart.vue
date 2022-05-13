<template>
  <LoadingA :active="isLoading"></LoadingA>
  <div class="container">
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th style="width: 50px"></th>
          <th style="width: 250px"></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <!-- 購物車資料有沒有存在 -->
        <template v-if="cartData.carts">
          <tr v-for="item in cartData.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
              >
                x
              </button>
            </td>
            <td>
              <div
                style="height: 100px; background-size: cover; background-position: center"
                :style="{
                  backgroundImage: `url(${item.product.imageUrl})`,
                }"
              ></div>
            </td>
            <td>
              {{ item.product.title }}
              <!-- <div class="text-success">已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- <input min="1" type="number" class="form-control"
                          v-model="item.qty"/> -->
                  <select
                    id=""
                    class="form-select"
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                  >
                    <option :value="num" v-for="num in 20" :key="`${num}-${item.id}`">
                      {{ num }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end">{{ cartData.total }}</td>
        </tr>
        <!-- <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ }}</td>
              </tr> -->
      </tfoot>
    </table>
  </div>
</template>

<script>
// 將emitter.js匯入使用
import emitter from "@/methods/emitter";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      isLoading: false,
    };
  },
  methods: {
    // 購物車的列表
    getCart() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          // console.log(res);
          this.cartData = res.data.data;
        });
    },
    // 刪除產品
    removeCartItem(id) {
      console.log(id);
      this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.getCart();
          // 傳給FrountNavbar去重撈購物車列表
          emitter.emit("get-cart");
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
          this.getCart();
        });
    },
    // 刪除全部產品
    removeAllCart() {
      this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.isLoading = false;
          alert(res.data.message);
          this.getCart();
          // 傳給FrountNavbar去重撈購物車列表
          emitter.emit("get-cart");
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
          this.getCart();
        });
    },
    // 更新產品數量
    updateCartItem(data) {
      this.isLoading = true;
      console.log(data);
      // 這邊的id是產品ID
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      // 更新的話因為要確定哪一筆訂單所以網址的ID也要放
      this.$http
        .put(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${data.id}`, {
          data: cart,
        })
        .then((res) => {
          this.isLoading = false;
          // console.log(res);
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
          this.getCart();
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
