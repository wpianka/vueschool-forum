<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories"/>
</template>

<script>
import sourceDate from '@/data.json';
import CategoryList from '@/components/CategoryList.vue';

export default {
  name: 'PageHome',
  components: {
    CategoryList,
  },
  data() {
    return {
      categories: sourceDate.categories,
    };
  },
};
</script>

<style scoped>

</style>
