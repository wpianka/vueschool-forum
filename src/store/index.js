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
    createPost({ commit, state }, post) {
      // eslint-disable-next-line no-param-reassign
      post.id = `qqqq${Math.random()}`;
      // eslint-disable-next-line no-param-reassign
      post.userId = state.authId;
      // eslint-disable-next-line no-param-reassign
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { post }); // set the post
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId }); // append post to thread
    },

    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = `qqqq${Math.random()}`;
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id,
      };
      commit('setThread', { thread });
      commit('appendThreadToUser', { userId, threadId: id });
      commit('appendThreadToForum', { forumId, threadId: id });
      dispatch('createPost', { text, threadId: id });
      // eslint-disable-next-line no-shadow
      return state.threads.find((thread) => thread.id === id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      // eslint-disable-next-line no-shadow
      const thread = state.threads.find((thread) => thread.id === id);
      // eslint-disable-next-line no-shadow
      const post = state.posts.find((post) => post.id === thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit('setThread', { thread: newThread });
      commit('setPost', { post: newPost });
      return newThread;
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id });
    },
  },
  mutations: {
    setPost(state, { post }) {
      const index = this.state.posts.findIndex((p) => p.id === post.id);
      if (post.id && index !== -1) {
        state.posts[index] = post;
      } else {
        state.posts.push(post);
      }
    },
    setThread(state, { thread }) {
      const index = this.state.threads.findIndex((t) => t.id === thread.id);
      if (thread.id && index !== -1) {
        state.threads[index] = thread;
      } else {
        state.threads.push(thread);
      }
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((item) => item.id === userId);
      state.users[userIndex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const threadCurrent = state.threads.find((thread) => thread.id === threadId);
      threadCurrent.posts = threadCurrent.posts || [];
      threadCurrent.posts.push(postId);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      // eslint-disable-next-line no-shadow
      const forum = state.forums.find((forum) => forum.id === forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, { userId, threadId }) {
      // eslint-disable-next-line no-shadow
      const user = state.users.find((user) => user.id === userId);
      user.threads = user.threads || [];
      user.threads.push(threadId);
    },
  },
});
