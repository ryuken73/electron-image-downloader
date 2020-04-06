module.exports = async target => {
    console.log(target.type());
    target.type() === 'page' && console.log((await target.page()).url());
    console.log(target.url());
}