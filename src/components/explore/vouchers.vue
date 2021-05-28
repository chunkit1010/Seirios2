<template>
  <div class="body-container-with-nav vouchers">
    <ActivitiesList :dropdownValue="null" :filterItems="filterOptions" :isVoucher="true" :showPurchasedItems="showPurchasedItems"/>
  </div>
</template>

<script>
import ActivitiesList from '@/components/explore/activity-items-list.vue';

export default {
  name: "vouchers",
  data() {
    return {
      showPurchasedItems: null,
      filterOptions: [
        { code: false, name: 'Current Vouchers' },
        { code: true, name: 'Used vouchers' }
      ]
    }
  },
  components: {
    ActivitiesList
  },
  created() {
    if (this.$route.query.used) {
      this.showPurchasedItems = true;
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.vouchers {
  padding-top: 1em;
}
</style>
