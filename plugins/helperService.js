export class Helpers {
  /**
   * Helper method to get users from users.json
   *
   * @param commit
   */
  fetchUsers = async ({ ...opts }) => {
    const { commit } = opts
    const res = await fetch('/users.json')
    const users = await res.json()
    // save details
    commit('SAVE_ALL_USERS', users)
    const search = localStorage.getItem('lastSearchQuery')
    if (search) {
      await this.searchUsers({ ...opts, search })
    } else {
      commit('UPDATE_FILTERED_USERS', users) // first time without a search
    }
    commit('SET_LOADING_STATE', false)
  }

  /**
   * Helper method to highlight search param occurrence in string
   *
   * @param string
   * @param query
   * @returns {string}
   */
  highlight = (string, query) => {
    const foundInString = string.toLowerCase().includes(query)

    if (foundInString) {
      return string.replace(new RegExp(query, 'gi'), (match) => {
        return `<span class='text-highlight'>${match}</span>`
      })
    }

    return string
  }

  /**
   * Helper method to search and filter users
   *
   * @param options
   */
  searchUsers = (options = {}) => {
    const { commit, state, search } = options

    if (!search.length) {
      commit('UPDATE_FILTERED_USERS', state.allUsers)
      return
    }

    if (state.previousSearch[search]) {
      commit('UPDATE_FILTERED_USERS', state.previousSearch[search])
      return
    }

    // if none of this, do a new search from all users
    let users = []
    users = state.allUsers.reduce((users, user) => {
      const re = new RegExp(search, 'gi')
      const { email, title, city, address, name, ...rest } = user

      if (
        Object.values({ email, title, city, address, name }).join().match(re)
      ) {
        users.push({
          ...rest,
          email: this.highlight(email, search),
          name: this.highlight(name, search),
          title: this.highlight(title, search),
          city: this.highlight(city, search),
          address: this.highlight(address, search),
        })
      }

      return users
    }, [])
    commit('UPDATE_FILTERED_USERS', users)
    commit('ADD_TO_PREVIOUS_SEARCH', { search, users })
  }
}

export default ({ app }, inject) => {
  const helpers = new Helpers()
  inject('helpers', helpers)
}
