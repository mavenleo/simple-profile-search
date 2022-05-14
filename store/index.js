import { searchUsers } from '@/plugins/helperService'

export const state = () => ({
  userStore: [],
  users: [],
  previousSearch: {},
  loadingUsers: true,
})

export const getters = {
  userStore(state) {
    return state.userStore
  },

  users(state, getters) {
    return state.users
  },

  loadingUsers(state, getters) {
    return state.loadingUsers
  },
}

export const mutations = {
  UPDATE_CACHE(state, data) {
    state.previousSearch[data.key] = data.users
  },

  SAVE_USERS_TO_STORE(state, users) {
    // console.log(users)
    state.userStore = users
  },

  UPDATE_USERS(state, users) {
    state.users = users
  },

  SET_LOADING(state, isLoading) {
    state.loadingUsers = isLoading
  },
}

export const actions = {
  getUsers({ commit }) {
    return this.$axios
      .$get('/users.json')
      .then((r) => {
        commit('SAVE_USERS_TO_STORE', r)
        commit('UPDATE_USERS', r)

        return r
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  filterUsers({ commit, state }, payload) {
    searchUsers({ commit, state, payload })
  },
}
