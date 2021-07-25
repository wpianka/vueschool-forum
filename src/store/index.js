import { createStore } from 'vuex';
import sourceDate from '@/data.json';
import { findById, upsert } from '@/helpers';

export default createStore({
  state: {
    ...sourceDate,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state, getters) => getters.user(state.authId),
    user: (state) => (id) => {
      const user = findById(state.users, id);
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
    thread: (state) => (id) => {
      const thread = findById(state.threads, id);
      return {
        ...thread,
        get author() {
          return findById(state.users, thread.userId);
        },
        get repliesCount() {
          return thread.posts.length - 1;
        },
        get contributorsCount() {
          return thread.contributors.length;
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
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId }); // append post to thread
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId });
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
      commit('appendThreadToUser', { parentId: userId, childId: id });
      commit('appendThreadToForum', { parentId: forumId, childId: id });
      dispatch('createPost', { text, threadId: id });
      // eslint-disable-next-line no-shadow
      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      // eslint-disable-next-line no-shadow
      const thread = findById(state.threads, id);
      // eslint-disable-next-line no-shadow
      const post = findById(state.posts, thread.posts[0]);
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
      upsert(state.posts, post);
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((item) => item.id === userId);
      state.users[userIndex] = user;
    },
    // eslint-disable-next-line no-use-before-define
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    // eslint-disable-next-line no-use-before-define
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

    // eslint-disable-next-line no-use-before-define
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

    // eslint-disable-next-line no-use-before-define
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
  },
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
