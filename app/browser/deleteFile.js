
const fs = require('fs');

module.exports = async (fname) => {
    return fs.promises.unlink(fname);
}