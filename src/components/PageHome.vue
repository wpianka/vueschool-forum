<template>
  <div v-for="thread in threads" :key="thread.id" >
    <h2>{{thread.title}}</h2>
    <div v-for="postId in thread.posts" :key="postId">
      <p>{{userById(postById(postId).userId).name}}</p>
      <p>{{postById(postId).text}}</p>
    </div>
  </div>
</template>

<script>
import sourceDate from '@/data.json';

export default {
  name: 'PageHome',
  data() {
    return {
      threads: sourceDate.threads,
      posts: sourceDate.posts,
      users: sourceDate.users,
    };
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>

<style scoped>

</style>
W
