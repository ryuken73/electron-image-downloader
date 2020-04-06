const fs = require('fs');

const checkDirWritable = ({dirname}) => {
    return new Promise((resolve, reject) => {
        fs.access(dirname, fs.constants.W_OK, function(err) {
            if(err){
              console.error(`cannot write ${dirname}`);
              reject(err);
              return;
            }          
            console.log(`can write ${dirname}`);
            resolve(true);
            return;
        });
    })
}

// const dir = 'd:/temp1';
// checkDirWritable({dirname: dir})
// .then(() => console.log('writable'))
// .catch((err) => console.error(err))

module.exports = checkDirWritable;