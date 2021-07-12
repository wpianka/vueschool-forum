import { createStore } from 'vuex';
import sourceDate from '@/data.json';

export default createStore({
  state: {
    ...sourceDate,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((item) => item.id === state.authId);
      if (!user) return null;
      return {
        ...user,
        get posts() {
          return state.posts.filter((post) => post.userId === user.id);
        },
        get postsCount() {
          return this.posts.length;
        },
        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id);
        },
        get threadsCount() {
          return this.threads.length;
        },
      };
    },
  },
  actions: {
    createPost(context, post) {
      // eslint-disable-next-line no-param-reassign
      post.id = `qqqq${Math.random()}`;
      context.commit('setPost', { post }); // set the post
      context.commit('appendPostToThread', { postId: post.id, threadId: post.threadId }); // append post to thread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((item) => item.id === userId);
      state.users[userIndex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const threadCurrent = state.threads.find((thread) => thread.id === threadId);
      threadCurrent.posts.push(postId);
    },
  },
});
