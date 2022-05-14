/**
 * Helper method to highlight search param occurrence in string
 *
 * @param string
 * @param query
 * @returns {string}
 */
const highlightMatchingString = (string, query) => {
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
 * @param commit
 * @param state
 * @param payload
 */
export const searchUsers = (commit, state, payload) => {
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
}
