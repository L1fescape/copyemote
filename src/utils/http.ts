// function getLocalStorageItem(storageKey: string) {
//   return new Promise(resolve => {
//     localStorage.getItem(storageKey, function(result) {
//       resolve(result ? result[storageKey] : [])
//     })
//   })
// }
//
// function setLocalStorageItem(storageKey: string, value: any): PromiseLike<void> {
//   return new Promise(resolve => {
//     localStorage.setItem(
//       {
//         [storageKey]: item
//       },
//       () => resolve(item)
//     )
//   })
// }
//
// export function http(url) {
//   // return new Promise(resolve => {
//   //   getLocalStorageItem(url)
//   //     .then(value => {
//   //       if (value) {
//   //         resolve(value)
//   //       }
//   //     })
//   //     .then()
//   // return Promise.all()
//   // fetch(url)
// }
