<template>
  <div>
    <div class="filter">
      <span v-for="item in filterItems" :key="item.id"
        :class="['filter__item', {'filter__item--selected' : filterSelected === item.id}]"
        @click="filterItemsById(item.id)">{{item.state}}</span>
    </div>

    <h4><strong>{{selectedStateData.state}} Covid restriction updates:</strong></h4>
    <p class="covid-updates-date">
      <b-icon-exclamation-octagon-fill class="icon-warning" v-if="selectedStateData.icon"></b-icon-exclamation-octagon-fill>
      <strong> Last updated:</strong> {{updatedDate}}
    </p>

    <div class="covid-updates">
       <b-row cols="1" cols-md="2">
        <b-col>
          <img class="covid-updates__icon" src="assets/svg/mask.svg" />
          <div>
            <strong>Mandatory to wear face mask on:</strong>
            <p class="covid-updates__text" v-html="selectedStateData.faceMaskRules"></p>
            <p class="covid-updates__text" v-if="selectedStateData.state === 'Victoria'">
              <strong class="covid-updates__text">Mandatory to wear face masks if:</strong>
              <ul>
                <li>Diagnosed with COVID-19</li>
                <li>A close contact of someone diagnosed with COVID-19</li>
                <li>Waiting for COVID-19 test results</li>
              </ul>
            </p>
          </div>
        </b-col>
        <b-col>
          <img class="covid-updates__icon" src="assets/svg/social-distancing.svg" />
          <div>
            <strong>Capacity at social gatherings:</strong>
            <p class="covid-updates__text" v-html="selectedStateData.socialGatheringRules"></p>

            <div class="covid-updates__text" v-if="selectedStateData.state === 'Victoria'">
              <strong> Capacity at indoor facilities:</strong>
              <p class="covid-updates__text">Theatres, cinemas, music halls, concert halls, auditoriums, galleries, museums, and sports and physical recreation.</p>
              <p class="covid-updates__text" v-html="selectedStateData.socialDistancingRules"></p>
            </div>
          </div>
        </b-col>
        <b-col>
          <img class="covid-updates__icon" alt="permit" src="assets/svg/permit.svg" />
          <div>
            <strong v-html="selectedStateData.permitRules"></strong>
          </div>  
        </b-col>
        <b-col>
          <img class="covid-updates__icon" alt="mobile" src="assets/svg/mobile.svg" />
          <div>
            <strong>Required to download Service {{selectedStateData.state}} app</strong>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "covid-updates",
  async mounted() {
    this.getStateUpdatesRecords();
  },
  data() {
    return {
      filterItems: [],
      filterSelected: null,
      selectedStateData: []
    }
  },

  computed: {
    updatedDate() {
      return new Date().toISOString().split('T')[0];
    }
  },

  methods: {
    async getStateUpdatesRecords() {
      this.loading = true;
      const res = await fetch("states.json");
      this.filterItems = await res.json();
      this.filterSelected = this.filterItems[0].id;
      this.selectedStateData = this.filterItems[0];
      this.loading = false;
    },

    filterItemsById(id) {
      this.filterSelected = id;
      this.selectedStateData = this.filterItems.find(item => item.id === id);
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.covid-updates {
  text-align: center;
  margin: 2em;

  .col {
    text-align: left;

    @media (min-width: 768px) {
      padding: 0 4em;
    } 
  }
}

.covid-updates-date {
  color: #979797;
}

.covid-updates__icon {
  margin: 0 auto 1em;
  width: 100%;
  height: 5em;
  margin-top: 2em;
}
</style>
