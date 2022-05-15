/**
 * Helper method to get users from users.json
 *
 * @param commit
 */
export const fetchUsers = async (commit) => {
  const res = await fetch('/users.json')
  const users = await res.json()
  // save details
  commit('SAVE_USERS_TO_STORE', users)
  commit('UPDATE_FILTERED_USERS', users) // first time without a search
  commit('SET_LOADING', false)
}

/**
 * Helper method to highlight search param occurrence in string
 *
 * @param string
 * @param query
 * @returns {string}
 */
const highlight = (string, query) => {
  const foundInString = string.toLowerCase().includes(query)

  if (foundInString) {
    return string.replace(new RegExp(query, 'gi'), (match) => {
      return `<span class='text-highlight'>${match}</span>`
    })
  }

  // Do nothing I guess
  return ''
}

/**
 * Helper method to search and filter users
 *
 * @param options
 */
export const searchUsers = (options = {}) => {
  const { commit, state, payload } = options

  if (payload.length) {
    let users = []

    if (state.previousSearch[payload]) {
      // load previous result gotten from same search
      users = state.previousSearch[payload]
    } else {
      users = state.allUsers.reduce((users, user) => {
        const regEx = new RegExp(payload, 'gi')

        const { email, title, city, name, ...rest } = user

        if (Object.values({ email, title, city, name }).join().match(regEx)) {
          users.push({
            ...rest,
            email: highlight(email, payload) || user.email,
            name: highlight(name, payload) || user.name,
            title: highlight(title, payload) || user.title,
            city: highlight(city, payload) || user.city,
          })
        }

        return users
      }, [])

      commit('UPDATE_CACHE', { key: payload, users })
    }

    commit('UPDATE_FILTERED_USERS', users)
  } else {
    commit('UPDATE_FILTERED_USERS', state.allUsers)
  }
}
