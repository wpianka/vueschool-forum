import { createStore } from 'vuex';
import sourceDate from '@/data.json';

export default createStore({
  state: {
    ...sourceDate,
    authId: 'rpbB8C6ifrYmNDufMERWfQUoa202',
  },
  getters: {
    authUser: (state) => state.users.find((user) => user.id === state.authId),
  },
  actions: {
    createPost(context, post) {
      // eslint-disable-next-line no-param-reassign
      post.id = `qqqq${Math.random()}`;
      context.commit('setPost', { post }); // set the post
      context.commit('appendPostToThread', { postId: post.id, threadId: post.threadId }); // append post to thread
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    appendPostToThread(state, { postId, threadId }) {
      const threadCurrent = state.threads.find((thread) => thread.id === threadId);
      threadCurrent.posts.push(postId);
    },
  },
});
