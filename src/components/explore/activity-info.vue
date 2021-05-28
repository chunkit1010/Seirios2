<template>
  <div class="body-container-with-nav activity-info" v-if="selectedActivity">
    <div class="activity-info__flex">
      <div class="form-container__link activity-info__left" @click="backBtnClicked()">
        <b-icon-chevron-left></b-icon-chevron-left>
        Back
      </div>

      <b-spinner v-if="loading" style="width: 3rem; height: 3rem;"></b-spinner>

      <div class="activity-info__right activity-info__right--with-bg-color">
        <div class="activity-item__bottom-container-info">
          <div class="activity-item__bottom-info">
            <span>Distance away<b-button v-if="selectedActivity.distance > travelRestrictionsLimit" class="tooltip-btn" size="sm" v-b-tooltip.hover :title="`There is a ${travelRestrictionsLimit}km travel limit in Victoria today. You can buy the voucher and use it when the limit is lifted.`"><b-icon-info-circle-fill></b-icon-info-circle-fill></b-button></span>
            <span :class="['activity-item__info--green', {'activity-item__info--red' : selectedActivity.distance > travelRestrictionsLimit}]">
              <span v-if="selectedActivity.distance <= travelRestrictionsLimit"><b-icon-check2></b-icon-check2> {{selectedActivity.distance}}K</span>
              <span v-else>
                <b-icon-x-circle-fill></b-icon-x-circle-fill> {{selectedActivity.distance}}K
              </span>
            </span>
          </div>
          <div class="activity-item__bottom-info">
            Mask
            <span :class="['activity-item__info--green', {'activity-item__info--mask-required' : selectedActivity.isMaskRequired}]">
              <span v-if="!selectedActivity.isMaskRequired"><b-icon-check2></b-icon-check2> Not required</span>
              <span v-else><b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill> Required</span>
            </span>
          </div>
          <div class="activity-item__bottom-info">
            Maximun limit
            <span class="activity-item__info--green">{{selectedActivity.maxLimit}}</span>
          </div>
          <div class="activity-item__bottom-info">
            <span>Covid Safe<b-button class="tooltip-btn" size="sm" v-b-tooltip.hover title="Rating based on hygiene and COVID safety measure employed by business operator."><b-icon-info-circle-fill></b-icon-info-circle-fill></b-button></span>
            <span>
              <b-form-rating :color="ratingColor(selectedActivity.ratingVal)" v-model="selectedActivity.ratingVal" size="md" readonly></b-form-rating>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="activity-info__gallery activity-info__gallery--desktop">
      <b-container class="bv-example-row">
        <b-row>
          <b-col><img class="activity-info__gallery-full-heigh-image" :src="imageSrc" /></b-col>
          <b-col>
            <img class="activity-info__gallery-half-heigh-image mb-1" :src="`../../assets/icons/activities/${selectedActivity.id}-0.jpg`" />
            <img class="activity-info__gallery-half-heigh-image" :src="`../../assets/icons/activities/${selectedActivity.id}-1.jpg`" />
          </b-col>
          <b-col>
            <img class="activity-info__gallery-half-heigh-image mb-1" :src="`../../assets/icons/activities/${selectedActivity.id}-2.jpg`" />
            <img class="activity-info__gallery-half-heigh-image" :src="`../../assets/icons/activities/${selectedActivity.id}-3.jpg`" />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="activity-info__gallery activity-info__gallery--mobile">
      <b-carousel id="carousel-fade" fade indicators img-width="1024" img-height="200">
        <b-carousel-slide
          :img-src="imageSrc"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="`../../assets/icons/activities/${selectedActivity.id}-0.jpg`"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="`../../assets/icons/activities/${selectedActivity.id}-1.jpg`"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="`../../assets/icons/activities/${selectedActivity.id}-2.jpg`"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="`../../assets/icons/activities/${selectedActivity.id}-3.jpg`"
        ></b-carousel-slide>
      </b-carousel>
    </div>

    <div class="activity-info__flex">
      <div class="activity-info__left">
        <span class="font-uppercase mb-3">{{selectedActivity.type}}</span>
        <span class="item-right-float font-size-lg"><strong>${{selectedActivity.price}}/pp</strong></span>
        <p class="font-size-lg mt-3">{{selectedActivity.name}}</p>
        <p class="mt-4" v-html="selectedActivity.description"></p>
        <b-container class="bv-example-row text-center mt-4">
          <b-row>
            <b-col v-if="selectedActivity.indoorSpace"><b-icon-shop class="icons-large"></b-icon-shop><br/>Indoor space</b-col>
            <b-col v-if="selectedActivity.outdoorSpace"><b-icon-tree-fill class="icons-large"></b-icon-tree-fill><br/>Outdoor space</b-col>
            <b-col v-if="selectedActivity.isPetsAllowed"><img class="mb-2" alt="pet" src="../../assets/svg/pet.svg" /><br/>Pet friendly</b-col>
            <b-col v-if="selectedActivity.byoWine"><img class="mb-2" alt="byo" src="../../assets/svg/wine.svg" /><br/>BYO</b-col>
            <b-col v-if="selectedActivity.freeCancellation"><b-icon-calendar-check-fill class="icons-large"></b-icon-calendar-check-fill><br/>Flexible arrangements</b-col>
          </b-row>
        </b-container>
      </div>
      <div class="activity-info__right activity-info__grey-container text-left">
        <p class="font-size-lg">What’s included</p>
        <ul v-html="selectedActivity.includes"></ul>
      </div>
    </div>

    <div class="activity-info__summery">
      <p><strong>Address:</strong><br/>{{selectedActivity.address}}</p>
      <p><strong>Running Times:</strong><br/>{{selectedActivity.runningTime}}</p>
      <p>
        <strong>Flexible cancellation: </strong>
        <b-icon-check-circle-fill class="icon-success" v-if="selectedActivity.freeCancellation"></b-icon-check-circle-fill>
        <b-icon-exclamation-octagon-fill class="icon-warning" v-else></b-icon-exclamation-octagon-fill>
      </p>
      <p><strong>Cancellation Policy:</strong><br/>{{selectedActivity.cancellationPolicy}}</p>
    </div>

    <b-modal v-model="showModal" id="purchase" hide-footer hide-header centered>
      <PaymentModalBody :activity-price="selectedActivity.price" :activityName="selectedActivity.name" />
    </b-modal>

    <button type="button" @click="buyActivityClicked()" class="activity-info__btn btn btn-primary mt-3 mb-4">Purchase now</button>

    <div class="activity-info__rating" v-if="showRatingResult">
      <div class="user-account__initial user-account__initial--small">
        <b>{{userInitial}}</b>
      </div>
      <small><span><b>Reviewed On:</b> {{ratingDate}}</span></small>
      <div class="activity-info__rating-val">
        <b-form-rating :color="ratingColor(ratingValue)" v-model="ratingValue" size="md" readonly></b-form-rating>
      </div>
      <p>{{ratingComment}}</p>
    </div>
  </div>
</template>

<script>
import PaymentModalBody from '@/components/payment/payment-modal.vue';

export default {
  name: "activity-info",
  data() {
    return {
      selectedActivity: null,
      travelRestrictionsLimit: localStorage.travelRestrictionsLimit,
      loading: true,
      showModal: false,
      showRatingResult: null,
      ratingValue: null,
      ratingComment:  null,
      ratingDate: null,
      userInitial: null
    }
  },
  
  components: {
    PaymentModalBody
  },

  computed: {
    imageSrc() {
      return `../../assets/icons/activities/${this.selectedActivity.icon}`;
    },

    getPurchasedItems() {
      const purchasedItems = JSON.parse(localStorage.getItem("purchasedActivities") || "[]");
      return purchasedItems.length;
    }
  },

  methods: {
    backBtnClicked() {
      window.location.href = '/explore';
    },
    ratingColor(val) {
      if (val > 3) {
        return '#028727';
      } else if (val >= 2) {
        return '#EF7D2A';
      } else {
        return '#F21E1E';
      }
    },
    buyActivityClicked() {
      this.showModal = !this.showModal;
    },
    async getUserInitial() {
      const userRes = await fetch("user.json");
      const user = JSON.parse(localStorage.getItem('newUserObject')) ? JSON.parse(localStorage.getItem('newUserObject')) : await userRes.json();
      this.userInitial = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
  },

  async created() {
    this.getUserInitial();
    const res = await fetch("activities.json");
    const activitiesList = await res.json();

    this.selectedActivity = activitiesList.find((item) => item.id === parseInt(this.$route.query.id));
    const ratingResult = JSON.parse(localStorage.getItem("ratingDetails"));

    if (ratingResult && parseInt(this.$route.query.id) === ratingResult.activityId) {
      this.showRatingResult = true;
      this.ratingValue = ratingResult.ratingVal;
      this.ratingComment =  ratingResult.ratingComment;
      this.ratingDate = ratingResult.ratingDate;
    }

    this.loading = false;
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.activity-info__flex {
  padding: 0.5em;

  @media (min-width: 768px) {
    display: flex;
    padding: 0.5em 1em;
  }
}

.activity-info__left {
  flex: 1;
  text-align: left;
  margin-right: 1em;
}

.activity-info__right {
  flex: 1;
  text-align: right;

  &--with-bg-color {
    background-color: rgba(114, 34, 245, 0.03);
    box-shadow: 0 10px 20px rgba(87, 23, 192, 0.12);
    border: 1px solid rgba(87, 23, 192, 0.12);
  }
}

.activity-info__gallery {
  @media (min-width: 1200px) {
    height: 300px;
    margin: 1em 0;
    width: 95%;
  }
  .col {
    padding: 0;
  }

  .container {
    margin: 0em 2em;
    padding: 0;
  }

  &--mobile {
    display: block;

    @media (min-width: 1200px) {
      display: none;
    }
  }

  &--desktop {
    display: none;

    @media (min-width: 1200px) {
      display: block;
    }
  }
}
.activity-info__gallery-full-heigh-image {
  height: 300px;
}
.activity-info__gallery-half-heigh-image {
  height: 147px;
  background-size: cover;
  width: 95%;
}

.activity-info__grey-container {
  background-color: #F4F4F4;
  width: 100%;
  padding: 1em;
  margin: 2em 0 1em;

  @media (min-width: 768px) {
    float: right;
    max-width: 40%;
    margin-left: 3em;
    margin-top: 0;
  }

  @media (min-width: 1200px) {
    max-width: 30%;
  }
}

.activity-info__btn {
  width: 70%;

  @media (min-width: 768px) {
    width: auto;
    float: left;
    margin-left: 1em;
  }
}

.activity-info__modal-body {
  display: flex;
  width: 47%;
  margin: 1em auto;
}

.intro-modal__icon {
  margin: 0 0 2em;
}

.activity-info__summery {
  text-align: left;
  margin: 0 1em;
}

.user-account__initial {
  &--small {
    width: 60px;
    height: 60px;
    padding: 0.5em 0;
    margin-left: 0.2em;
    margin-bottom: 0.5em;
  }
}
.activity-info__rating {
  text-align: left;
  margin-left: 1em;
  clear: both;
  margin-top: 4em;

  .b-rating {
    padding-left: 0;
    margin-left: 0;
  }
}
.activity-info__rating-val {
  width: 10%;
}
</style>
