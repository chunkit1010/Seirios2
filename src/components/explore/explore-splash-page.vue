<template>
  <div class="body-container-with-nav">
    <template v-if="showWhereToExplore">
      <WhereToExplore @explore-link-clicked="showWhereToExplore = false" />
    </template>
    <template v-else>
      <ExploreOptionsList @where-to-explore-clicked="showWhereToExplore = true" />
    </template>
  </div>
</template>

<script>
import WhereToExplore from '@/components/explore/where-to-explore.vue';
import ExploreOptionsList from '@/components/explore/explore-options-list.vue';

export default {
  name: "explore-splash-page",
  data() {
    return {
      showWhereToExplore: true
    }
  },

  components: {
    WhereToExplore,
    ExploreOptionsList
  }
}
</script>
<style lang="scss" scoped>
</style>
