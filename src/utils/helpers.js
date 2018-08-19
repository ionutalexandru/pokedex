// Define useful function

export const addItem = (list, item) => [... list, item]

export const findById = (list, id) => list.find(item => item.id === id)

export const removeFromList = (list, id) => {
  const removeIndex = list.findIndex(item => id === item.id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex+1)
  ]
}

export const findByTerm = (list, property, term) => {
  return list.filter(item => item[property].includes(term.toLowerCase()))
}

export const toggleProperty = (item, property) => {
  let updatedItem = item
  updatedItem[property] = !item[property]
  return updatedItem
}
