<template>
  <div class="text-center" v-if="item">
    <h4 class="mb-4">Thank you for your purchase!</h4>

    <div class="activity-item__top-container">
      <div v-if="!item.used" class="activity-item__badge activity-item__badge--teal">
        <span class="activity-item__badge-text">{{item.badge}}</span>
      </div>
      <img class="activity-item__image" :src="imageSrc(item.icon)" />
      <div class="activity-item__top-container-text">
        <div class="activity-item__text-left">
          <span class="font-uppercase">{{item.type}}</span>
          <br/>
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="activity-item__top-container-shadow"></div>
    </div>

    <div class="activity-item__bottom-container activity-item__bottom-container--purchased">
      <div class="activity-item__bottom-container-info">
        <div class="activity-item__bottom-info">
          <span>Distance away<b-button v-if="item.distance > travelRestrictionsLimit" class="tooltip-btn" size="sm" v-b-tooltip.hover :title="`There is a ${travelRestrictionsLimit}km travel limit in Victoria today. You need to wait to use this voucher when the limit is lifted.`"><b-icon-info-circle-fill></b-icon-info-circle-fill></b-button></span>
          <span :class="['activity-item__info--green', {'activity-item__info--red' : item.distance > travelRestrictionsLimit}]">
            <span v-if="item.distance <= travelRestrictionsLimit"><b-icon-check2></b-icon-check2> {{item.distance}}K</span>
            <span v-else><b-icon-x-circle-fill></b-icon-x-circle-fill> {{item.distance}}K</span>
          </span>
        </div>
        <div class="activity-item__bottom-info">
          Mask
          <span :class="['activity-item__info--green', {'activity-item__info--mask-required' : item.isMaskRequired}]">
          <span v-if="!item.isMaskRequired"><b-icon-check2></b-icon-check2> Not required</span>
          <span v-else><b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill> Required</span>
          </span>
        </div>
        <div class="activity-item__bottom-info">
          Maximun limit
          <span class="activity-item__info--green">{{item.maxLimit}}</span>
        </div>
        <div class="activity-item__bottom-info">
          <span>Covid Safe<b-button class="tooltip-btn" size="sm" v-b-tooltip.hover title="Rating based on hygiene and COVID safety measure employed by business operator."><b-icon-info-circle-fill></b-icon-info-circle-fill></b-button></span>
          <span>
            <b-form-rating :color="ratingColor(item.ratingVal)" v-model="item.ratingVal" size="md" readonly></b-form-rating>
          </span>
        </div>
      </div>

      <div class="activity-item__qr-code-container">
        <b-alert class="activity-item__qr-code-alert" show>
          <b-icon-info-circle />
          <strong> Please present this QR code to the staff at checkout!</strong>
        </b-alert>
        <img class="activity-item__qr-code" :src="`assets/icons/activities/${item.qrCode}`" />
      </div>
    </div>

    <div class="plr-2 mt-4">
      <b-button squared variant="outline-secondary" class="form-container__btn" @click="navigateToVoucher()">
        My Vouchers
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "purchased-info",
  data() {
    return {
      item: null,
      travelRestrictionsLimit: 0
    }
  },

  methods: {
    navigateToVoucher() {
      window.location.href = '/vouchers';
    },

    imageSrc(icon) {
      return `assets/icons/activities/${icon}`;
    },

    ratingColor(val) {
      if (val >= 3) {
        return '#028727';
      } else if (val >= 2) {
        return '#EF7D2A';
      } else {
        return '#F21E1E';
      }
    }
  },

  async created() {
    const res = await fetch("travelRestrictions.json");
    const restrictions = await res.json();
    this.travelRestrictionsLimit = restrictions[0].travelLimitDistance;
    localStorage.travelRestrictionsLimit = this.travelRestrictionsLimit;
    this.item = JSON.parse(localStorage.getItem("purchasedActivity") || null);
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
