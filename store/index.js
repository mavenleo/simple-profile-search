import { searchUsers, getUsers } from '@/plugins/helperService'

export const state = () => ({
  allUsers: [],
  filteredUsers: [],
  previousSearch: {},
  loadingUsers: true,
})

export const getters = {
  allUsers(state) {
    return state.allUsers
  },

  filteredUsers(state, getters) {
    return state.filteredUsers
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
    state.allUsers = users
  },

  UPDATE_FILTERED_USERS(state, users) {
    state.filteredUsers = users
  },

  SET_LOADING(state, isLoading) {
    state.loadingUsers = isLoading
  },
}

export const actions = {
  getUsers({ commit }) {
    return getUsers({ commit, Axios: this.$axios })
  },

  filterUsers({ commit, state }, payload) {
    searchUsers({ commit, state, payload })
  },
}
