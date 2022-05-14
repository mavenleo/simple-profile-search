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
