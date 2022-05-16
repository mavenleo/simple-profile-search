export const helpers = {
  /**
   * Helper method to get users from users.json
   *
   * @param commit
   */
  fetchUsers: async (commit) => {
    const res = await fetch('/users.json')
    const users = await res.json()
    // save details
    commit('SAVE_ALL_USERS', users)
    commit('UPDATE_FILTERED_USERS', users) // first time without a search
    commit('SET_LOADING_STATE', false)
  },

  /**
   * Helper method to highlight search param occurrence in string
   *
   * @param string
   * @param query
   * @returns {string}
   */
  highlight: (string, query) => {
    const foundInString = string.toLowerCase().includes(query)

    if (foundInString) {
      return string.replace(new RegExp(query, 'gi'), (match) => {
        return `<span class='text-highlight'>${match}</span>`
      })
    }

    return string
  },

  /**
   * Helper method to search and filter users
   *
   * @param options
   */
  searchUsers: (options = {}) => {
    const { commit, state, search } = options

    if (search.length) {
      let users = []

      if (state.previousSearch[search]) {
        // load previous result gotten from same search
        users = state.previousSearch[search]
      } else {
        users = state.allUsers.reduce((users, user) => {
          const re = new RegExp(search, 'gi')
          const { email, title, city, address, name, ...rest } = user

          if (
            Object.values({ email, title, city, address, name })
              .join()
              .match(re)
          ) {
            users.push({
              ...rest,
              email: helpers.highlight(email, search),
              name: helpers.highlight(name, search),
              title: helpers.highlight(title, search),
              city: helpers.highlight(city, search),
              address: helpers.highlight(address, search),
            })
          }

          return users
        }, [])
        commit('ADD_TO_PREVIOUS_SEARCH', { search, users })
      }
      commit('UPDATE_FILTERED_USERS', users)
    } else {
      commit('UPDATE_FILTERED_USERS', state.allUsers)
    }
  },
}

export default ({ app }, inject) => {
  inject('helpers', helpers)
}
