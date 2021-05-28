<template>
  <div class="list mb-3">
    <b-container class="bv-example-row mt-3">
      <div class="form-container__link activity-info__left" @click="skipBtnClicked()">
        <b-icon-chevron-left></b-icon-chevron-left>
        Back
      </div>

      <b-row cols="2" cols-lg="3">
        <b-col class="list__item" v-for="item in cards" :key="item.id">
          <div :class="['list__item-container', {'list__item-container--selected' : item.selected}]"
            @click="itemClicked(item.id, item.selected)">
            <div class="list__item-caption">{{item.name}}</div>
            <img class="list__item-image" :alt="item.name" :src="imageSrc(item.icon)" />
            <b-icon-check-circle-fill v-if="item.selected" class="list__item-checked"></b-icon-check-circle-fill>
            <div class="list__shadow"></div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="list__btn-container">
      <button type="button" @click="continueBtnClicked()" class="form-container__btn btn btn-primary btn-lg btn-block mt-4">Continue</button>
    </div>
    <p class="mt-4 mb-5">
      <a class="form-container__link" @click="skipBtnClicked()">Skip</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "explore-options-list",
  async mounted() {
    this.getRecords();
  },
  data() {
    return {
      cards: []
    }
  },

  methods: {
    async getRecords() {
      //TODO: Add try catch error
      const res = await fetch("exploreoptions.json");
      this.cards = await res.json();
    },

    imageSrc(icon) {
      return `../../assets/icons/${icon}`;
    },

    itemClicked(id, selected) {
      const selectedItem = this.cards.find((item) => item.id === id);
      if (selectedItem) {
        this.cards[id].selected = !selected;
      }
    },

    continueBtnClicked() {
      window.location.href = "/explore";
    },

    skipBtnClicked() {
      this.$emit('where-to-explore-clicked');
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin-bottom: 4em;
}

.list__item {
  position: relative;
  margin: 2em 0;
}

.list__item-container {
  transition: all .2s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &--selected {
    .list__item-image {
      filter: brightness(65%);
    }
  }
}

.list__item-checked {
  color: #421EB7;
  position: absolute;
  top: 15px;
  right: 25%;
  font-size: 1.5em;
  background-color: #fff;
  border-radius: 50%;
}

.list__item-caption {
  color: white;
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  font-size: 1.4em;
}

.list__item-image {
  width: 80%;

  @media (min-width: 768px) {
    width: 60%;
  }
}

.list__shadow {
  height: 70px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent 100%);
  position: absolute;
  bottom: 0;
  width: 72%;
  left: 14%;

  @media (min-width: 768px) {
    width: 56%;
    left: 22%;
  }
}

.list__btn-container {
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 35%;
  }
}
</style>
