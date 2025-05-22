<template>
  <v-app>
    <OneView />
  </v-app>
</template>

<script>
import OneView from './layout/OneView.vue';

export default {
  name: 'App',
  components: {
    OneView,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>
