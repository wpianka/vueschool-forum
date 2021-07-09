<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
          <textarea
            v-model="text"
            name=""
            id=""
            cols="30"
            rows="10"
            class="form-input"
          >
          </textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
// import this.$store.state from "@/data.json";

export default {
  name: 'PostEditor',

  data() {
    return {
      text: '',
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: 'rpbB8C6ifrYmNDufMERWfQUoa202',
      };

      this.$emit('save', { post });

      this.text = '';
    },
  },
};
</script>

<style scoped>

</style>
