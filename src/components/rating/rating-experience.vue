<template>
  <div>
    <div v-if="!showThankYouPage" class="form-container__link activity-info__left pt-0" @click="backBtnClicked()">
      <b-icon-chevron-left></b-icon-chevron-left>
      Back
    </div>

    <div class="text-left mt-5" v-if="!showThankYouPage">
      Please help us monitor how covid safe your experience with <strong>{{name}}</strong> was!

      <p class="mt-4">1. Overall how was your experience?</p>
      <div class="rating__container">
        <b-form-rating :color="ratingColor(q1Value)" size="md" v-model="q1Value"></b-form-rating>
      </div>

      <p class="mt-3">2. Were hand sanitaton stations on site?</p>
      <div class="b-icon-yes-no  rating__container">
        <span class="mr-3">
          <b-icon-x-circle-fill class="icon-alert" v-if="q2ValueNo"></b-icon-x-circle-fill>
          <b-icon-circle @click="noClicked(2)" v-else></b-icon-circle> NO
        </span>
        <span>
          <b-icon-check-circle-fill class="icon-success" v-if="q2ValueYes"></b-icon-check-circle-fill>
          <b-icon-circle @click="yesClicked(2)" v-else></b-icon-circle> YES
        </span>
      </div>

      <p class="mt-3">3. Was the hand soap fully stocked in the bathroom?</p>
      <div class="b-icon-yes-no rating__container">
        <span class="mr-3">
          <b-icon-x-circle-fill class="icon-alert" v-if="q3ValueNo"></b-icon-x-circle-fill>
          <b-icon-circle @click="noClicked(3)" v-else></b-icon-circle> NO
        </span>
        <span>
          <b-icon-check-circle-fill class="icon-success" v-if="q3ValueYes"></b-icon-check-circle-fill>
          <b-icon-circle @click="yesClicked(3)" v-else></b-icon-circle> YES
        </span>
      </div>

     <p class="mt-3">4. How fresh was the air ventilation?</p>
      <div class="rating__container">
        <b-form-rating :color="ratingColor(q4Value)" size="md" v-model="q4Value"></b-form-rating>
      </div>

      <p class="mt-3">5. Are the surfaces clean?</p>
      <div class="b-icon-yes-no rating__container">
        <span class="mr-3">
          <b-icon-x-circle-fill class="icon-alert" v-if="q5ValueNo"></b-icon-x-circle-fill>
          <b-icon-circle @click="noClicked(5)" v-else></b-icon-circle> NO
        </span>
        <span>
          <b-icon-check-circle-fill class="icon-success" v-if="q5ValueYes"></b-icon-check-circle-fill>
          <b-icon-circle @click="yesClicked(5)" v-else></b-icon-circle> YES
        </span>
      </div>

      <p class="mt-3">6. Was the 1.5 metre rule implemented?</p>
      <div class="b-icon-yes-no  rating__container">
        <span class="mr-3">
          <b-icon-x-circle-fill class="icon-alert" v-if="q6ValueNo"></b-icon-x-circle-fill>
          <b-icon-circle @click="noClicked(6)" v-else></b-icon-circle> NO
        </span>
        <span>
          <b-icon-check-circle-fill class="icon-success" v-if="q6ValueYes"></b-icon-check-circle-fill>
          <b-icon-circle @click="yesClicked(6)" v-else></b-icon-circle> YES
        </span>
      </div>
    
      <p class="mt-3">7. Any additional comments or reviews?</p>
      <div>
        <b-form-textarea
          id="textarea"
          v-model="q7Value"
          placeholder="Enter your comments here..."
          rows="3"
          max-rows="6"></b-form-textarea>
      </div>

      <button type="button" @click="submitBtnClicked()" class="rating__container btn btn-primary mt-3 mb-4">Submit</button>
    </div>
    <div class="text-center" v-else>
      <img class="rating__container" alt="login" src="../../assets/svg/thank-you.svg" />
      <h4><b>Thank you for your contribution</b></h4>
      <h6 class="mt-4">Here is a discount code of <b>$3.00</b> for your next purchase!</h6>
      <strong>RMT0APEC!21</strong>
      <br/>
      <b-button squared variant="outline-secondary" class="rating__container--half mt-4 mb-4" @click="afterRatingBackBtnClicked()">Back</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "rating-experience",
  data() {
    return {
      showThankYouPage: null,
      q1Value: null,
      q2ValueNo: false,
      q2ValueYes: false,
      q3ValueNo: false,
      q3ValueYes: false,
      q4Value: null,
      q5ValueNo: false,
      q5ValueYes: false,
      q6ValueNo: false,
      q6ValueYes: false,
      q7Value: null,
    }
  },

  props: {
    name: null,
    id: null
  },

  methods: {
    backBtnClicked() {
      this.$emit('back-to-vouchers-clicked');
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
    submitBtnClicked() {
      this.showThankYouPage = true;
      localStorage.discountCode = "RMT0APEC!21";
      const ratingDetails = { ratingVal: 4.5, ratingComment: this.q7Value, activityId: this.id, ratingDate: new Date().toISOString().split('T')[0] };
      localStorage.setItem('ratingDetails', JSON.stringify(ratingDetails));
      this.$emit('item-rated');
    },

    noClicked(questionNo) {
      if(questionNo === 2) {
        this.q2ValueNo = true;
      } else if (questionNo === 3) {
        this.q3ValueNo = true;
      } else if (questionNo === 5) {
        this.q5ValueNo = true;
      } else if (questionNo === 6) {
        this.q6ValueNo = true;
      }
    },

    yesClicked(questionNo) {
      if(questionNo === 2) {
        this.q2ValueYes = true;
      } else if (questionNo === 3) {
        this.q3ValueYes = true;
      } else if (questionNo === 5) {
        this.q5ValueYes = true;
      } else if (questionNo === 6) {
        this.q6ValueYes = true;
      }
    },
    afterRatingBackBtnClicked() {
      this.$emit('item-rated-back-btn');
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.rating__container {
  width: 40%;

  &--half {
    width: 20%;
  }
}

.b-icon-yes-no {
  .b-icon {
    font-size: 1.2em;
    margin-right: 10px;
  }
}
</style>
