module.exports = (optionProvider) => {
    return optionKey => {
        try {
            return optionProvider.set(optionKey);
        } catch(err) {
            console.error(err);
        }
    }
}