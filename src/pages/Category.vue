<template>
  <h1>{{ category.name }}</h1>
  <ForumList
    :title="category.name"
    :forums="getForumsForCategory(category)"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue';
import sourceDate from '@/data.json';

export default {
  name: 'Category',
  components: {
    ForumList,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    category() {
      return sourceDate.categories.find((category) => category.id === this.id);
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
