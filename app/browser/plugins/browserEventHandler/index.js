const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(fname => fname !== path.basename(__filename));
const moduleMaps = files.map(fname => {
    const extname = path.extname(fname);
    const regexp = new RegExp(`${extname}$`)
    const moduleName = fname.replace(regexp,'');  
    return [moduleName, require(path.join(__dirname,moduleName))]
}).reduce((acc, moduleArray) => { 
    return {...acc, [moduleArray[0]]: moduleArray[1]}
},{})

module.exports = moduleMaps;
