<template>
  <div class="notification">
   <div :class="['notification-container', {'notification-container--alert' : item.type === 'alert'}]"
    v-for="(item, index) in notificationItems" :key="index">
     <div class="notification-container__info-panel">
        <div v-if="item.status" class="notification-container__badge">New</div>
        <img v-if="item.type === 'alert'" class="notification-container__icon notification-container__icon--alert mt-1" alt="covid" src="assets/svg/covid.svg" />
        <b-icon-file-medical-fill v-else-if="item.type === 'reminder'" class="notification-container__icon notification-container__icon--reminder"></b-icon-file-medical-fill>
        <b-icon-star-fill v-else class="notification-container__icon notification-container__icon--rating"></b-icon-star-fill>
        <span :class="['notification-container__title', {'notification-container__title--alert' : item.type === 'alert', 'notification-container__title--reminder' : item.type === 'reminder', 'notification-container__title--rating' : item.type === 'rate'}]"
          v-html="notificationTitle(item)"></span>
        <br/>
        <p v-html="item.description"></p>
        <p v-html="notificationLink(item)"></p>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "notifications",
  async mounted() {
    this.getNotificationsRecords();
  },
  data() {
    return {
      notificationItems: []
    }
  },
  methods: {
    async getNotificationsRecords() {
      this.loading = true;
      const res = await fetch("notifications.json");
      const items = await res.json();
      if (localStorage.ratingDetails) {
        if (localStorage.purchasedActivity) {
          this.notificationItems = items.filter(item => item.type !== 'rate');
        } else {
          this.notificationItems = items.filter(item => item.type !== 'rate' && item.type !== 'reminder');
        }
      } else {
        if (localStorage.purchasedActivity) {
          this.notificationItems = items;
        } else {
          this.notificationItems = items.filter(item => item.type !== 'reminder');
        }
      }
      this.loading = false;
    },

    notificationTitle(item) {
      switch(item.type) {
        case 'alert':
          return !item.timeVisited ? item.title : `One new coronavirus case recorded at <b>${item.activityName}</b> on <b>${item.activityDate}</b>.`;
        case 'reminder':
          return `<b>${item.activityName}</b> voucher is going to Expire soon!`;
        case 'rate':
          return `Please share your Covid safety experience with <b>${item.activityName}</b>, which you visited on <b>${item.activityDate}</b>!`;
        default:
          return '';
      }
    },

    notificationLink(item) {
      switch(item.type) {
        case 'alert':
          return !item.timeVisited ? `Please visit <a class="form-container__link" href="${item.link}">state Covid restrictions</a> for more information.` : `Please visit <a class="form-container__link" href="${item.link}" target="_blank">here</a> to check how you can tested.`;
        case 'reminder':
          return `You can see the details of your experience <a class="form-container__link" href="${item.link}">here</a>.`;
        case 'rate':
          return `<a class="form-container__link" href="${item.link}?used=true">Rate your experience</a>`;
        default:
          return '';
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.notification-container {
  padding: 1em 1.5em;

  &--alert {
    background-color: #FEF3F3;
    padding: 1.5em;
  }
}

.notification-container__info-panel {
  position: relative;
  background-color: white;
  box-shadow: 0 10px 20px rgba(87, 23, 192, 0.12);
  width: 100%;
  padding: 1.5em;

  @media (min-width: 768px) {
    width: 95%;
  }
}

.notification-container__badge {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #421EB7;
  color: white;
  float: left;
  padding: 0 1em;

  @media (min-width: 768px) {
    left: 0;
    right: inherit;
  }

  &--rating {
    background-color: #66a6cb;
    left: 0;
  }
}

.notification-container__icon {
  font-size: 2em;
  position: absolute;
  top: 10px;

  @media (min-width: 768px) {
    position: unset;
  }

  &--alert {
    color: #E54545;
    width: 1em;
  }

  &--reminder {
    color: #421EB7;

    @media (min-width: 768px) {
      margin-top: 0.5em;
    }
  }

  &--rating {
    color: #66a6cb;
  }
}

.notification-container__title {
  margin-top: 0.5em;
  display: block;
  margin-top: 1.5em;

  @media (min-width: 768px) {
    display: inline-block;
    margin-top: 0;
    margin-left: 10px;
  }

  &--alert {
    color: #E54545;
  }

  &--reminder {
    color: #421EB7;
  }

  &--rating {
    color: #66a6cb;
  }
}
</style>
