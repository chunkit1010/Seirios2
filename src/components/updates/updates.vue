<template>
  <div class="body-container-with-nav">
    <div class="sub-menu__container">
      <div class="sub-menu__item" v-for="(item, index) in subMenuItems" :key="index">
        <div class="sub-menu__item-container" v-if="item.title">
          <span :class="['sub-menu__item-content', { 'sub-menu__item-content--active': item.active }]"
            @click="subItemClicked(index)">
            <span class="sub-menu__item-text">{{item.title}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="notifications" v-if="showNotifications">
      <Notifications />
    </div>
    <div class="updates" v-if="showCovidUpdates">
      <CovidUpdates />
    </div>
  </div>
</template>

<script>
import Notifications from '@/components/updates/notifications.vue';
import CovidUpdates from '@/components/updates/covid-updates.vue';

export default {
  name: "updates",
  data() {
    return {
      showNotifications: true,
      showCovidUpdates: false,
      subMenuItems: [
        { index: 0, title: 'Notifications', active: true },
        { index: 1, title: 'State Covid updates', active: false }
      ]
    }
  },
  components: {
    Notifications,
    CovidUpdates
  },

  methods: {
    subItemClicked(index) {
      this.subMenuItems.forEach((item) => {
        item.active = item.index === index ? true : false;
      });

      this.showNotifications = this.subMenuItems[0].active;
      this.showCovidUpdates = this.subMenuItems[1].active;
    }
  },

  created() {
    if (this.$route.query.restrictions === "true") {
      this.subItemClicked(1);
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.sub-menu__container {
  position: fixed;
  display: flex;
  top: 64px;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 101;

  @media (min-width: 768px) {
    left: 16%;
    transition: all 0.3s;
    top: 0;
  }
}

.sub-menu__item {
  width: 100%;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
}

.sub-menu__item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  background-color: rgba(114, 34, 245, 0.03);
}

.sub-menu__item-content {
  padding: 0.9em 0 0.5em;
  border-bottom: 6px solid rgba(114, 34, 245, 0.03);

  &:hover {
    text-decoration: none;
    padding: 0.6em 0 0.8em;
    border-color: #F2E9FF;
  }

  &--active {
    text-decoration: none;
    font-weight: bold;
    border-color: #421EB7;
    padding: 0.6em 0 0.8em;

    &:hover {
      border-color: #421EB7;
    }
  }
}

.sub-menu__item-text {
  color: #421EB7;
}

.notifications {
  margin: 7.2em auto 5em;
  text-align: left;

  @media (min-width: 768px) {
    margin: 2.3em auto 3.3em;
  }
}

.updates {
  width: 97%;
  margin: 8em auto;
  text-align: left;

  @media (min-width: 768px) {
    margin: 4em auto;
  }
}
</style>
