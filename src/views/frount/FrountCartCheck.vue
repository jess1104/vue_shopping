<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table align-middle mt-3">
          <thead>
            <tr>
              <th width="150"></th>
              <th width="300">商名</th>
              <th class="text-end">數量</th>
              <th width="120" class="text-end">單價</th>
              <th width="120" class="text-end">小計</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartData.carts">
              <tr v-for="item in cartData.carts" :key="item.id">
                <td>
                  <div
                    style="height: 100px; background-size: cover; background-position: center"
                    :style="{
                      backgroundImage: `url(${item.product.imageUrl})`,
                    }"
                  ></div>
                </td>
                <td>
                  <span>{{ item.product.title }}</span>
                </td>
                <td class="text-end">
                  {{ item.qty }}
                </td>
                <td class="text-end">
                  {{ item.product.price }}
                </td>
                <td class="text-end">
                  {{ item.product.price * item.qty }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <td></td>
          </tfoot>
        </table>
        <Form v-slot="{ errors }" ref="form" @submit="onSubmit" class="row justify-content-center">
          <div class="col-lg-8">
            <h1 class="h4 text-center fw-bold mb-3">收件資訊</h1>
            <div class="mb-3">
              <label for="email" class="form-label">收件人信箱</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="max:12||required"
                v-model="form.user.name"
              />
              <ErrorMessage name="姓名" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人手機號碼</label>
              <Field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                v-model="form.user.tel"
                :rules="isFormPhone"
              />
              <ErrorMessage name="電話" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              />
              <ErrorMessage name="地址" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
          </div>
          <div class="col-lg-8 text-end my-3 my-lg-4">
            <div class="row">
              <div class="col-lg-6 mb-3 my-lg-0">
                <button class="btn btn-outline-dark w-100" @click="goBackPage" type="button">
                  回上一頁
                </button>
              </div>
              <div class="col-lg-6 my-1 my-lg-0">
                <button
                  class="btn btn-primary w-100"
                  :disabled="Object.keys(errors).length > 0 || cartData.total === 0"
                  type="submit"
                >
                  送出訂單
                </button>
              </div>
            </div>
          </div>
        </Form>
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
      // 購物車列表
      cartData: {
        carts: [],
      },
      isLoading: false,
      // 表單
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
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
        })
        .catch((error) => {
          this.isLoading = false;
          alert(error.response.data.message);
        });
    },
    isFormPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    onSubmit() {
      const order = this.form;
      this.$http
        .post(`${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order`, { data: order })
        .then((response) => {
          alert(`${response.data.message},繼續買吧!`);
          // 重整表單
          this.$refs.form.resetForm();
          this.getCart();
          // 傳給FrountNavbar去重撈購物車列表
          emitter.emit("get-cart");
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch((error) => {
          alert(error);
        });
    },
    goBackPage() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
