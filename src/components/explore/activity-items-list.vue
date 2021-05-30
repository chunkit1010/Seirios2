<template>
  <div class="activity-item">
    <div v-if="!showRating" :class="['filter', {'filter--with-left-margin' : isFilterWithLeftMargin}]">
      <span v-for="item in filterItems" :key="item.code"
        :class="['filter__item', {'filter__item--selected' : filtertypeSelected === item.code}]"
        @click="filterItemsByType(item.code)">{{item.name}}</span>
    </div>

    <b-spinner v-if="loading" style="width: 3rem; height: 3rem;"></b-spinner>
    <div v-else-if="!showRating">
      <b-row cols="1" cols-md="2">
        <b-col v-for="(item, index) in activities" :key="index">
          <div class="activity-item__top-container" @click="activityItemClicked(item.id)">
            <div v-if="!item.used" :class="['activity-item__badge', {'activity-item__badge--teal' : item.purchased}]">
              <span class="activity-item__badge-text">{{item.badge}}</span>
            </div>
            <img class="activity-item__image" :src="imageSrc(item.icon)" />
            <div class="activity-item__top-container-text">
              <div class="activity-item__text-left">
                <span class="font-uppercase">{{item.type}}</span>
                <br/>
                <span>{{item.name}}</span>
              </div>
              <span class="activity-item__text-right">${{item.price}}/pp</span>
            </div>
            <div class="activity-item__top-container-shadow"></div>
          </div>

          <div :class="['activity-item__bottom-container', {'activity-item__bottom-container--purchased': item.purchased}]">
            <div class="activity-item__bottom-container-info">
              <div class="activity-item__bottom-info">
                <span>Distance away<b-button v-if="item.distance > travelRestrictionsLimit" class="tooltip-btn" size="sm" v-b-tooltip.hover :title="`There is a ${travelRestrictionsLimit}km travel limit in Victoria today. You can buy the voucher and use it when the limit is lifted.`"><b-icon-info-circle-fill></b-icon-info-circle-fill></b-button></span>
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

            <div v-if="isVoucher && item.purchased && !item.used" class="activity-item__qr-code-container">
              <b-alert class="activity-item__qr-code-alert" show>
                <b-icon-info-circle />
                <strong> Please present this QR code to the staff at checkout!</strong>
              </b-alert>
              <img class="activity-item__qr-code" :src="`../../assets/icons/activities/${item.qrCode}`" />
            </div>
            <div v-if="isVoucher && item.purchased && item.used" class="activity-item__used-info">
              <div class="activity-item__used-info-text">
                <h5><strong>Used on:</strong></h5>
                <p class="mb-0">{{item.dateUsed}}</p>
                <p>{{item.timeUsed}}</p>
                <b-button squared variant="outline-secondary" @click="experienceRatingClicked(item.name, item.id)" :disabled="disabledBtn">Rate this experience</b-button>
              </div>
              <div class="activity-item__used-info-icon">
                <img alt="used" src="../../assets/svg/voucher-used.svg" />
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <div class="activity-item__caption">
        <p class="activity-item__caption-text">No more activities</p>
      </div>
    </div>
    <div v-else>
      <RateExperience @back-to-vouchers-clicked="showRating=false" :name="selectedItemName" :id="selectedItemId" @item-rated="disableBtn()" @item-rated-back-btn="showRating=false" />
    </div>

    <router-view />
  </div>
</template>

<script>
import RateExperience from '@/components/rating/rating-experience.vue';

export default {
  name: "explore",
  async mounted() {
    this.getRecords();
  },

  props: {
    dropdownValue: String,
    filterItems: null,
    isFilterWithLeftMargin: { type: Boolean, default: false },
    isVoucher: { type: Boolean, default: false },
    showPurchasedItems: { type: Boolean, default: false }
  },

  components: {
    RateExperience
  },

  data() {
    return {
      activities: [],
      travelRestrictionsLimit: null,
      loading: false,
      filtertypeSelected: this.filterItems[0].code,
      purchasedItem: null,
      showRating: false,
      selectedItemName: null,
      selectedItemId: null,
      disabledBtn: localStorage.ratingDetails ? true : false
    }
  },

  methods: {
    async getRecords() {
      this.loading = true;
      const res = await fetch("activities.json");
      if (this.isVoucher) {
        const allActivities = await res.json();
        this.activities = allActivities.filter(item => item.purchased && !item.used);
      } else {
        const allActivities = await res.json();
        this.activities = allActivities.filter(item => !item.purchased);
      }

      this.addPurchasedItemToList();
      this.loading = false;
    },

    addPurchasedItemToList() {
      this.purchasedItem = JSON.parse(localStorage.getItem("purchasedActivity") || null);
      if (this.purchasedItem) {
        this.activities.push(this.purchasedItem);
      }
    },

    imageSrc(icon) {
      return `../../assets/icons/activities/${icon}`;
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

    async filterItemsByType(id) {
      this.filtertypeSelected = id;
      this.loading = true;
      const res = await fetch("activities.json");
      this.activities = await res.json();

      this.addPurchasedItemToList();

      if (!this.isVoucher) {
        if (id === 'T6') {
          const filteredList = this.activities.filter(item => parseInt(item.ratingVal) > 3.5 && item.distance < this.travelRestrictionsLimit);
          this.activities = filteredList;
        } else if (id !== 'All') {
          const filteredList = this.activities.filter(item => item.typeId === id);
          this.activities = filteredList;
        }
      } else {
        const filteredList = this.activities.filter(item => (item.used && item.used === id) || (!item.used && item.purchased && item.used === id));
        this.activities = filteredList;
      }

      this.loading = false;
    },

    async filterItemsByDistance(distance) {
      this.loading = true;
      const res = await fetch("activities.json");
      this.activities = await res.json();

      if (distance !== 'No limit') {
        const filteredList = this.activities.filter(item => parseInt(item.distance) >= distance);
        this.activities = filteredList;
      }
      this.loading = false;
    },

    activityItemClicked(id) {
      window.location.href = `/activity-info?id=${id}`;
    },

    experienceRatingClicked(name, id) {
      this.selectedItemName = name;
      this.showRating = true;
      this.selectedItemId = id;
    },
    disableBtn() {
      this.disabledBtn = true;
    }
  },

  async created() {
    const res = await fetch("travelRestrictions.json");
    const restrictions = await res.json();
    this.travelRestrictionsLimit = restrictions[0].travelLimitDistance;
    localStorage.travelRestrictionsLimit = this.travelRestrictionsLimit;

    if (this.showPurchasedItems) {
      this.filterItemsByType(this.showPurchasedItems);
    }
  },

  watch: {
    activities(newVal) {
      this.activities = newVal;
    },

    dropdownValue(newVal) {
      this.filterItemsByDistance(newVal);
    }
  },
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';


.filter {
  margin: 1em 0.5em;
  text-align: left;
  clear: both;

  @media (min-width: 768px) {
    padding: 1em 0;
    margin-left: 0;
  }

  &--with-left-margin {
    @media (min-width: 768px) {
      margin: 0 2.8em 1em;
    }
  }
}
.filter__item {
  border: 1px solid black;
  padding: 5px 15px;
  display: inline-block;
  margin: 0.3em;
  border-radius: 16px;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
    margin: 0.15em;
  }

  &:hover {
    cursor: pointer;
    background-color: #F2E9FF;
    color: #421EB7;
    border-color: #F2E9FF;
  }

  &--selected {
    background-color: #421EB7;
    color: white;
    border-color: #421EB7;

    &:hover {
      background-color: #421EB7;
      color: white;
      border-color: #421EB7;
    }
  }
}

.activity-item {
  width: 97%;
  margin: 0 auto;

  .col {
    padding-bottom: 1.5em !important;
  }
}

.activity-item__top-container {
  position: relative;
  cursor: pointer;
}

.activity-item__badge {
  z-index: 1;
  position: absolute;
  right: -0.5em;
  width: 100px;
  top: 1em;
  display: flex;
  background: #421EB7;
  color: white;
  padding: 0.25em 0;

  &--teal {
    background: #870252;
    left: 0;
    width: auto;
    max-width: 11em;
  }
}

.activity-item__badge-text {
  margin: auto;
}

.activity-item__image {
  width: 100%;
  min-height: 322px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.activity-item__top-container-text {
  color: white;
  position: absolute;
  bottom: 10px;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  font-size: 1.4em;
  text-align: left;

  .activity-item__text-left {
    width: 70%;
    display: inline-block;
    margin-left: 0.5em;
    font-size: 20px;
  }
  .activity-item__text-right {
    position: absolute;
    bottom: 0;
    right: 0.5em;
  }
}

.activity-item__top-container-shadow {
  height: 95px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent 100%);
  position: absolute;
  bottom: 0;
  width: 100%;
}

.activity-item__bottom-container {
  background-color: #F4F4F4;

  &--purchased {
    background-color: white;
    box-shadow: 0 10px 20px rgba(87, 23, 192, 0.12);
  }
}

.activity-item__bottom-container-info {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row !important;
  padding: 0.5em 0;
  font-size: 15px;
}

.activity-item__bottom-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  text-align: center;

  span {
    font-weight: bold;
  }
}

.activity-item__info {
  &--green {
    color: #028727;
  }

  &--mask-required {
    color: #EF7D2A;
  }

  &--red {
    color: #F21E1E;
  }
}

.activity-item__qr-code-container {
  text-align: center;
  padding-top: 0.5em 0;
}

.activity-item__qr-code-alert {
  margin: 0.5em 2em 0;
}

.activity-item__caption {
  width: 50%;
  margin: 0 auto;
  padding-bottom: 1em;
  color: #00160A;
}

.activity-item__caption-text {
  display: flex;
  font-size: 1.2em;
  margin-top: 0.5em;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid;
    transform: translateY(-0.8em);
  }

  &::before {
    margin-right: 0.5em;

    @media (min-width: 768px) {
      margin-right: 3em;
    }
  }

  &::after {
    margin-left: 0.5em;

    @media (min-width: 768px) {
      margin-left: 3em;
    }
  }
}

.activity-item__used-info {
  display: flex;
  color: #00160A;
  padding: 1em 0;
}

.activity-item__used-info-text {
  flex: 1;
  text-align: left;
  padding-left: 1.5em;
}

.activity-item__used-info-icon {
  flex: 1;
}
</style>