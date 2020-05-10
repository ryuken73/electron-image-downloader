module.exports = (defaultOptions, customOptions) => {
    return optionKey => {
        try {
            const optionProvider = customOptions.get ? customOptions : new Map();
            return optionProvider.get(optionKey) || defaultOptions(optionKey);
        } catch(err) {
            console.error(err);
        }
    }
}