module.exports = async ({fname, buff, fs=null}) => {
    return new Promise((resolve, reject) => {
        try {
            if(!fs) fs = require('fs');
            const wStream = fs.createWriteStream(fname);
            wStream.write(buff, () => {
                resolve(true);
                wStream.close();
            })            
            wStream.on('error', (err) => {
                reject({msg:err});
                wStream.close();
            })
        } catch (err) {
            console.error(err)
            reject({msg:err});
        }
    })
}