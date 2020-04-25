const checkDirWritable = require('./checkDirWritable');
const mkdirp = require('mkdirp')

const checkDirExists = ({dirname, retryCount=0, MAX_RETRY_COUNT=2}) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(retryCount < MAX_RETRY_COUNT){
                console.log(`check directory exists [${dirname}][retry count=${retryCount}]`);
                const success = await checkDirWritable({dirname});
                if(success){
                    resolve(true);
                    return;
                }
            }
            console.error(`directory existence check failure [${dirname}]`);
            reject(`MAX_RETRY_COUNT exceed [${MAX_RETRY_COUNT}]`);            
        } catch (err) {
            if(err.errno === -4058) {
                retryCount++;
                console.error(`directory not writable or not exist. try make directory [${dirname}]`);
                await mkdirp(dirname);
                await checkDirExists({dirname, retryCount, MAX_RETRY_COUNT});
            }
        }
    })
}

module.exports = checkDirExists;