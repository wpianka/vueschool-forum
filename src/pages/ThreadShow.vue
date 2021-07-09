<template>
  <div class="col-large push-top">
    <h1>{{thread.title}}</h1>
    <post-list :posts="threadPosts" />
    <post-editor @save="addPost"/>
  </div>
</template>

<script>
import sourceDate from '@/data.json';
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';

export default {
  name: 'ThreadShow',
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      require: true,
      type: String,
    },
  },
  data() {
    return {
      threads: sourceDate.threads,
      posts: sourceDate.posts,
    };
  },
  computed: {
    thread() {
      return this.threads.find((thread) => thread.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.posts.push(post);
      this.thread.posts.push(post.id);
    },
  },
};
</script>

<style scoped>

</style>
