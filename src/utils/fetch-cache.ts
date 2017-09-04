function getLocalStorageItem(storageKey: string) {
  return new Promise(resolve => {
    const item = localStorage.getItem(storageKey)
    if (!item) {
      return {}
    }
    return JSON.parse(item)
  })
}

function setLocalStorageItem(storageKey: string, value: any): PromiseLike<void> {
  return new Promise(resolve => {
    localStorage.setItem(storageKey, JSON.stringify(value))
    resolve(value)
  })
}

function fetchCache(url) {
  return new Promise(resolve => {
    return getLocalStorageItem(url)
      .then(value => {
        if (!value) {
          return fetch(value)
        }
        return value
      })
  })
}

export = {
  fetch: fetchCache,
}
