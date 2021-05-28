<template>
  <div class="text-center">
    <div v-if="showExistingCard">
      <div class="form-container__link activity-info__left pt-0" @click="backBtnClicked()">
        <b-icon-chevron-left></b-icon-chevron-left>
        Back
      </div>
      <div class="text-center plr-2" v-if="showCreditCard">
        <div v-if="creditCardDetail">
          <hr />
          <div>
            <strong>{{creditCardDetail}}</strong>
            <img alt="credit-card" src="../../assets/icons/credit-card.png" />
          </div>
          <hr />
          <button type="button" @click="continueBtnclicked()" class="form-container__btn btn btn-primary mt-3 mb-3">Continue</button>
          <br />
        </div>
        <div v-else>
          <hr />
          <div>
            Please Sign up to proceed purchasing this voucher
          </div>
          <hr />
          <button type="button" @click="signUpClicked()" class="form-container__btn btn btn-primary mt-3 mb-3">Sign up</button>
        </div>
      </div>
      <div class="text-center plr-2" v-else>
        <hr />
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">CCV:</label>
          <b-form-input type="number" class="form-control--no-border form-control--small mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        </b-form>
        <hr />
        <b-overlay :show="loading" rounded opacity="0.6" spinner-small spinner-variant="dark">
          <button type="button" @click="purchase()" class="form-container__btn btn btn-primary mt-4">Purchase now</button>
        </b-overlay>
        <br />
      </div>

      <div class="plr-2" v-if="creditCardDetail">
        <b-button squared variant="outline-secondary" class="form-container__btn" @click="hideShowNewCreditCard()">
          <b-icon-plus></b-icon-plus> Add a new Card
        </b-button>
      </div>
    </div>
    
    <NewCreditCard v-else-if="!showActivityInfo" @back-btn-clicked="hideShowNewCreditCard()" @purchase-clicked="purchase()" />

    <PurchasedActivityInfo v-else />
  </div>
</template>

<script>
import NewCreditCard from '@/components/payment/new-credit-card.vue';
import PurchasedActivityInfo from '@/components/payment/purchased-info.vue';

export default {
  name: "existing-credit-card",
  data() {
    return {
      showExistingCard: true,
      loading: false,
      showActivityInfo: false,
      item: [],
      creditCardDetail: localStorage.newCreditCard ? localStorage.newCreditCard : null
    }
  },

  props: {
    showCreditCard: null
  },

  components: {
    NewCreditCard,
    PurchasedActivityInfo
  },

  methods: {
    backBtnClicked() {
      this.$emit('back-btn-clicked');
    },

    continueBtnclicked() {
      this.$emit('continue-btn-clicked');
    },
  
    async purchase() {
      this.loading = true;
      const res = await fetch("activities.json");
      const activitiesList = await res.json();
      const activity = activitiesList.find((item) => item.id === parseInt(this.$route.query.id));
      activity.purchased = true;
      activity.badge = "1 month until expired";
      this.item.push(JSON.stringify(activity));
      localStorage.setItem('purchasedActivity', this.item);
      localStorage.removeItem("discountCode");
      setTimeout(() => {
        this.loading = true;
        this.showExistingCard = false;
        this.showActivityInfo = true;
      }, 2000);
    },

    hideShowNewCreditCard() {
      this.showExistingCard = !this.showExistingCard;
    },

    signUpClicked() {
      window.location.href = '/sign-up';
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
