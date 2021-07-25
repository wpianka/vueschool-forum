<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{name: 'ThreadCreate', params: {forumId: forum.id}}"
        class="btn-green btn-small"
      >Start a thread
      </router-link>
    </div>
  </div>

  <div class="col-full push-top">
    <TheadList :threads="threads"/>
  </div>
</template>

<script>
import TheadList from '@/components/TheadList.vue';

export default {
  name: 'Forum',
  components: {
    TheadList,
  },
  props: {
    id: {
      require: true,
      type: String,
    },
  },
  computed: {
    forum() {
      return this.$store.state.forums.find((forum) => forum.id === this.id);
    },
    threads() {
      return this.forum.threads.map((threadId) => this.$store.getters.thread(threadId));
    },
  },
};
</script>

<style scoped>

</style>
