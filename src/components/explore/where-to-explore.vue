<template>
  <div>
    <div class="where-to-explore__icon-container">
      <img class="where-to-explore__icon" alt="explore" src="assets/svg/explore.svg" />
    </div>
    <div class="form-container form-container__where-to-explore">
      <form>
          <h3>Where do you want to explore?</h3>
          <br />
          <b-container class="bv-example-row">
            <b-row>
              <b-col md="12">
              <b-alert show variant="warning" v-if="travelRestrictionLimit">
                Due to latest Covid-19 regulations, there is a <b>{{travelRestrictionLimit}}K travel limit</b> restriction.
                Please visit <a href="https://www.dhhs.vic.gov.au/victorias-restriction-levels-covid-19" class="alert-link" target="_blank">DHHS website</a> for more information.
              </b-alert>
              <div class="input-group__with-border">
                <b-input-group>
                  <b-form-input :placeholder="userLocation"></b-form-input>
                  <template #append>
                    <b-dropdown variant="outline-dark" :text="dopdownText">
                      <b-dropdown-item v-for="option in dropdownOptions" :key="option.value" @click="dopdownText = option.value">
                        {{option.value}}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
              </div>
              </b-col>
            </b-row>
          </b-container>

          <button type="button" @click="continueBtnClicked()" class="form-container__btn btn btn-primary btn-lg btn-block mt-4">Continue</button>

          <p class="mt-4 mb-5">
            <a class="form-container__link" @click="continueBtnClicked()">Skip, I want to see all the activities</a>
          </p>
      </form>
      <b-modal v-model="showModal" id="modal-center" centered :hide-header="true">
        <p class="my-4">Seirios wants to access your location.</p>
        <template #modal-footer>
            <b-button
              variant="default"
              size="sm"
              class="float-right"
              @click="allowLocationTracking(false)">Cancel</b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="allowLocationTracking(true)">Allow</b-button>
        </template>
      </b-modal>

      <b-modal v-model="showIntroModal" id="purchase" hide-footer hide-header centered>
        <div class="text-center">
          <h4 class="mb-5"><strong>Welcome to Seirios</strong></h4>
          <b-container class="bv-example-row text-left">
            <b-row class="justify-content-md-center">
              <b-col cols="3"><img class="intro-modal__icon" alt="discover" src="assets/svg/discover.svg" /></b-col>
              <b-col cols="8">Explore and re-discover hidden local gems and experiences that should be on your radar.</b-col>
            </b-row>
            <b-row>
              <b-col cols="8">Travel Safe and with ease of mind according to latest Covid-19 Restrictions and guidelines in place.</b-col>
              <b-col cols="3"><img class="intro-modal__icon" alt="covid" src="assets/svg/covid-icon.svg" /></b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><img class="intro-modal__icon" alt="voucher" src="assets/svg/vouchers.svg" /></b-col>
              <b-col cols="8">Enjoy vouchers for affordable experiences and get discount when rating your covid experience.</b-col>
            </b-row>
          </b-container>

          <div class="plr-2">
            <button type="button" class="form-container__btn btn btn-primary mt-4 mb-3" @click="discoverNowClicked()">
              Discover Now
            </button>
          </div>
        </div>
      </b-modal>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "where-to-explore",
  data() {
    return {
      travelRestrictionLimit: null,
      showModal: null,
      userLocation: null,
      user: null,
      itemSelected: null,
      showIntroModal: null,
      dopdownText: '+25K',
      dropdownOptions: [
        { value: '+25K' },
        { value: '+50K' },
        { value: '+75K' },
        { value: '+100K' }
      ]
    }
  },

  methods: {
    continueBtnClicked() {
      window.location.href = "/explore";
    },

    allowLocationTracking(showUserLocation) {
      const newUserAccount = JSON.parse(localStorage.getItem('newUserObject'));
      if (showUserLocation) {
        this.userLocation = newUserAccount !== null ? newUserAccount.location : this.user[0].location;
      } else {
        this.userLocation = newUserAccount !== null ? newUserAccount.city : this.user[0].city;
      }
      localStorage.selectedLocation = this.userLocation;
      this.showModal = false;
    },

    async fetchUserDetails () {
      const userRes = await fetch("user.json");
      this.user = await userRes.json();
    },

    discoverNowClicked() {
      this.showIntroModal = false;
      setTimeout(() => {
        this.showModal = true;
      }, 500);
      
    }
  },

  async created() {
    //TODO: Add try catch error
    this.fetchUserDetails();
    const res = await fetch("travelRestrictions.json");
    const restrictions = await res.json();

    this.travelRestrictionLimit = restrictions[0].travelLimitDistance;

    this.showIntroModal = localStorage.introModalShowed ? !localStorage.introModalShowed : true;
    this.showModal = !this.showIntroModal;
    localStorage.introModalShowed = true;
  }
}
</script>
<style lang="scss">
@import "../../scss/variables.scss";

.where-to-explore__icon-container{
  text-align: center;
  padding-top: 3em;
}

.where-to-explore__icon {
  width: 70%;
  margin-bottom: 1em;

  @media (min-width: 768px) {
    width: 20%;
  }
}

.form-container__where-to-explore {
  @media (min-width: 768px) {
    position: unset !important;
    transform: inherit !important;
    width: 50% !important;
  }
}
</style>
