<template>
  <h1>Welcome to the Forum</h1>
  <TheadList :threads="threads"/>
</template>

<script>
import sourceDate from '@/data.json';
import TheadList from '@/components/TheadList.vue';

export default {
  name: 'PageHome',
  components: {
    TheadList,
  },
  data() {
    return {
      threads: sourceDate.threads,
    };
  },
};
</script>

<style scoped>

</style>
