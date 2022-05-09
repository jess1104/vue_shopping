import Modal from "bootstrap/js/dist/modal";

export default {
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
    // 初始去實例一個彈窗
    this.modal = new Modal(this.$refs.modal);
  },
};
