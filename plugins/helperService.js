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
export const highlightMatchingString = (string, query) => {
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

    commit('UPDATE_FILTERED_USERS', users)
  } else {
    commit('UPDATE_FILTERED_USERS', state.allUsers)
  }
}
