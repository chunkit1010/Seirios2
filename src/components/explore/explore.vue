<template>
  <div class="body-container-with-nav">
    <div class="explore-container">
      <img class="explore-container__image" src="../../assets/icons/explore-melbourne.png" />
      <b-input-group class="explore-container__input input-group--with-shadow" >
        <b-form-input :placeholder="location"></b-form-input>
        <template #append>
          <b-dropdown variant="outline-dark" :text="`${dopdownText} K`">
            <b-dropdown-item v-for="option in dropdownOptions" :key="option.value" @click="dropdownItemsClicked(option.value)">
              {{option.value}} K
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>

      <a class="explore-container__covid-alert-text" href="/updates?restrictions=true">
        <img class="explore-container__covid-alert-icon" alt="alert" src="../../assets/svg/covid.svg" />
        <span>Victoria restrictions</span>
      </a>
    </div>

    <ActivitiesList :dropdownValue="dopdownText" :filterItems="filterOptions" :isFilterWithLeftMargin="true" />
  </div>
</template>

<script>
import ActivitiesList from '@/components/explore/activity-items-list.vue';

export default {
  name: "explore",
  data() {
    return {
      dopdownText: '+25',
      dropdownOptions: [
        { value: '+0' },
        { value: '+25' },
        { value: '+50' },
        { value: '+75' },
        { value: '+100' }
      ],
      filterOptions: [
        { code: 'All', name: 'All' },
        { code: 'T6', name: 'Recommendations' },
        { code: 'T3', name: 'Entertainment' },
        { code: 'T0', name: 'Food & drinks' },
        { code: 'T2', name: 'Great outdoors' },
        { code: 'T1', name: 'Self guided tours' },
        { code: 'T4', name: 'Festivals' },
        { code: 'T5', name: 'Markets' }
      ],
      location: localStorage.selectedLocation
    }
  },

  methods: {
    dropdownItemsClicked(val) {
      this.dopdownText = val;
    }
  },

  components: {
    ActivitiesList
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.body-container-with-nav {
  margin-bottom: 6em;
  margin-top: 5em;
  
  @media (min-width: 768px) {
    margin-left: 16%;
    margin-top: 0;
  }
}

.explore-container__image {
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 100%;
    height: 161px;
    filter: brightness(65%);
  }
}

.explore-container__input {
  width: 97%;
  margin: 1em auto;
  height: 50px;

  @media (min-width: 768px) {
    width: 35%;
    transform: translate(4em, -2em);
    margin: 0;
  }
}
.input-group > .input-group-append > .btn-group > .btn {
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
  border-radius: 0;
  height: 50px;
}

.input-group {
  &--with-shadow {
    box-shadow: 0 10px 20px rgba(87, 23, 192, 0.12);
  }
}

.btn-group {
  background-color: white;
}

.explore-container__covid-alert-text {
  color: #E54545;
  font-size: 18px;
  float: left;
  margin: 0 0.5em 1.5em;
  text-align: left;

  span {
    margin-left: 0.5em;
  }

  @media (min-width: 768px) {
    margin-left: 4em;
  }

  &:hover {
    color: #E54545;
  }
}
.explore-container__covid-alert-icon {
  width: 1.5em;
}

.b-rating {
  border: none;
  color: #028727;
  background-color: transparent;

  .b-rating-star{
    padding: 0;
  }
}
</style>
