<template>
  <div>
    <div class="form-container__link activity-info__left pt-0" v-if="!addNew" @click="backBtnClicked()">
      <b-icon-chevron-left></b-icon-chevron-left>
      Back
    </div>
    <div class="item-with-full-width mb-5" >
      <p class="item-with-full-width text-left mt-3">Please enter your new credit card number</p>
      <br />
      <img alt="credit-card" src="assets/icons/credit-card.png" />

      <b-form inline>
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        -
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        -
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        -
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0"></b-form-input>
      </b-form>
      <b-form inline>
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0 float-left" placeholder="Expiry Date"></b-form-input>
        
        <b-form-input class="form-control--no-border form-control--xsmall mb-2 mr-sm-2 mb-sm-0 float-right" placeholder="CCV"></b-form-input>
      </b-form>
    </div>
    <b-overlay :show="loading" class="text-center" rounded opacity="0.6" spinner-small spinner-variant="dark">
      <button v-if="!addNew" type="button" @click="purchase()" class="form-container__btn btn btn-primary mt-3 mb-3">Purchase now</button>
      <button v-else @click="add()" type="button" class="form-container__btn btn btn-primary mt-5 mb-3">Add new Credit Card</button>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "new-credit-card",
  data() {
    return {
      ticketNumber: 1,
      totalPrice: this.activityPrice,
      showPrice: true,
      showCardPayment: false,
      showCreditCard: true,
      loading: false
    }
  },

  props: {
    activityPrice: null,
    addNew: {type: Boolean, default: false}
  },

  methods: {
    backBtnClicked() {
      this.$emit('back-btn-clicked');
    },

    purchase() {
      this.$emit('purchase-clicked');
      this.loading = true;
    },

    add() {
      this.$emit('add-clicked');
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
