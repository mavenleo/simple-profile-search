import { highlightMatchingString } from '@/plugins/helpers'

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
  loadUsers({ commit }) {
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
    if (payload.length > 0) {
      let users = []

      if (state.previousSearch[payload]) {
        // load previous result gotten from same search
        users = state.previousSearch[payload]
      } else {
        users = state.userStore.reduce((users, user) => {
          const email = highlightMatchingString(user.email, payload)
          const name = highlightMatchingString(user.name, payload)
          const title = highlightMatchingString(user.title, payload)
          const city = highlightMatchingString(user.city, payload)

          if (email || name || title || city) {
            users.push({
              ...user,
              email: email || user.email,
              name: name || user.name,
              title: title || user.title,
              city: city || user.city,
            })
          }

          return users
        }, [])

        commit('UPDATE_CACHE', { key: payload, users })
      }

      commit('UPDATE_USERS', users)
    } else {
      commit('UPDATE_USERS', state.userStore)
    }
  },
}
