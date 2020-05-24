// module.exports = (defaultOptions, customOptions) => {
//     return optionKey => {
//         try {
//             const optionProvider = customOptions.get ? customOptions : new Map();
//             return optionProvider.get(optionKey) || defaultOptions[optionKey];
//         } catch(err) {
//             console.error(err);
//         }
//     }
// }

const optionStore = (defaultOptions, storage) => {
    const optionProvider = storage.get ? storage : new Map();
    return {
        get : (key) => optionProvider.get(key) || defaultOptions[key],
        set : (key, value) => optionProvider.set(key, value)
    }
}

module.exports = optionStore;