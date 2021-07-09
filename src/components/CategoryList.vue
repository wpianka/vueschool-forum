<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue';
import sourceDate from '@/data.json';

export default {
  name: 'CategoryList',
  components: {
    ForumList,
  },
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getForumsForCategory(category) {
      return sourceDate.forums.filter((forum) => forum.categoryId === category.id);
    },
  },
};
</script>

<style scoped>

</style>
