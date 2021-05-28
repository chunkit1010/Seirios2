<template>
  <div class="home">
    <where-to-explore />
    <router-view />
  </div>
</template>

<script>
import WhereToExplore from '@/components/explore/where-to-explore.vue'

export default {
  name: 'Home',
  components: {
    WhereToExplore
  }
}
</script>
<style scoped>

</style>
