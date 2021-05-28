<template>
  <div>
    <SelectVoucherNum v-if="showPrice" :price="activityPrice" :name="activityName" @step-one-finished="modalBtnClicked()" />

    <ExistingCreditCard v-else-if="showCardPayment" :show-credit-card="showCreditCard" @back-btn-clicked="modalBtnClicked()" @continue-btn-clicked="paymentContinueClicked()" />
  </div>
</template>

<script>
import SelectVoucherNum from '@/components/payment/select-voucher-num.vue';
import ExistingCreditCard from '@/components/payment/existing-creadit-card.vue';

export default {
  name: "payment-modal",
  data() {
    return {
      showPrice: true,
      showCardPayment: false,
      showCreditCard: true
    }
  },

  props: {
    activityPrice: null,
    activityName: null
  },

  components: {
    SelectVoucherNum,
    ExistingCreditCard
  },

  methods: {
    modalBtnClicked() {
      if (this.showCreditCard) {
        this.showPrice = !this.showPrice;
        this.showCardPayment = !this.showCardPayment;
      } else {
        this.showCreditCard = !this.showCreditCard;
      }
    },

    paymentContinueClicked() {
      this.showCreditCard = !this.showCreditCard;
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
