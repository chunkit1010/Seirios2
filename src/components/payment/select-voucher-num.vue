<template>
  <div class="text-center">
    <h5 class="modal-title">
      {{name}}
      <span class="item-right-float mr-1"><strong>${{price}}/pp</strong></span>
    </h5>

    <p class="mt-4">Please choose how many vouchers you would like to buy</p>
    <div class="activity-info__flex activity-info__modal-body">
      <div class="form-container__link activity-info__left">
        <img alt="pet" src="assets/svg/minus.svg" @click="deductPurchaseNo()" />
      </div>
      <b-form-input v-model="ticketNumber" type="number" class="form-control form-control-sm" min="1" max="10"></b-form-input>
      <div class="form-container__link activity-info__right">
        <img alt="pet" src="assets/svg/plus.svg" @click="increasePurchaseNo()" />
      </div>
    </div>

    <b-form class="mb-5" inline>
      <b-form-input :placeholder="discountPlaceholder" class="form-control--no-border form-control--small mr-sm-2 mb-sm-0"></b-form-input>
    </b-form>

    <strong class="mt-5 mb-3">Total price:</strong>
    <p>
      <strong class="font-size-lg">${{totalPrice}}</strong>
      <span class="highlighted-text" v-if="discountPlaceholder !== 'Discount Code'"><b> (You are saving $3.00)</b></span>
    </p>
    <button type="button" @click="modalBtnClicked()" class="form-container__btn btn btn-primary">Continue</button>
  </div>
</template>

<script>
export default {
  name: "select-voucher-num",
  data() {
    return {
      ticketNumber: 1,
      totalPrice: localStorage.discountCode ? (this.price - 3) : this.price,
      discountPlaceholder: localStorage.discountCode ? localStorage.discountCode : "Discount Code"
    }
  },

  props: {
    price: null,
    name: null
  },

  methods: {
    modalBtnClicked() {
      this.$emit('step-one-finished');
    },
    deductPurchaseNo() {
      this.ticketNumber = this.ticketNumber - 1;
      this.totalPrice = this.price * this.ticketNumber;
    },
    increasePurchaseNo() {
      this.ticketNumber = this.ticketNumber + 1;
      this.totalPrice = this.price * this.ticketNumber;
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.modal-title {
  text-align: left;
  border-bottom: 1px solid #00160A;
  padding-bottom: 1em;
}
</style>
