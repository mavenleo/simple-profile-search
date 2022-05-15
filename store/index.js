export const state = () => ({
  loadingState: true,
  allUsers: [],
  filteredUsers: [],
  previousSearch: {},
})

export const getters = {
  allUsers(state) {
    return state.allUsers
  },

  filteredUsers(state, getters) {
    return state.filteredUsers
  },

  loadingState(state, getters) {
    return state.loadingState
  },
}

export const mutations = {
  SAVE_ALL_USERS(state, users) {
    state.allUsers = users
  },

  UPDATE_FILTERED_USERS(state, users) {
    state.filteredUsers = users
  },

  ADD_TO_PREVIOUS_SEARCH(state, options = {}) {
    const { search, users } = options
    state.previousSearch = {
      ...state.previousSearch,
      [search]: users,
    }
  },

  SET_LOADING_STATE(state, isLoading) {
    state.loadingState = isLoading
  },
}

export const actions = {
  getUsers({ commit }) {
    return this.$helpers.fetchUsers(commit)
  },

  filterUsers({ commit, state }, search) {
    this.$helpers.searchUsers({ commit, state, search })
  },
}
