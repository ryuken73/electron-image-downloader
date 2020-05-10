const fs = require('fs');
const mkdirp = require('mkdirp');

const number = {
    group1000(number){
        return new Intl.NumberFormat().format(number)
    },
    toByteUnit({number, unit='KB', point=0}){
        if(unit === 'KB') return (number/1024).toFixed(point);
        if(unit === 'MB') return (toByteUnit({number, unit:'KB',point})/1024).toFixed(point);
        if(unit === 'GB') return (toByteUnit({number, unit:'MB',point})/1024).toFixed(point);
        if(unit === 'TB') return (toByteUnit({number, unit:'GB',point})/1024).toFixed(point);
        return number;
    }
}

const clone = {
    replaceElement(array, index, newElement){
        return [
            ...array.slice(0, index),
            newElement,
            ...array.slice(index+1)
        ]
    }
}

const file = {
    async delete(fname){
        return fs.promises.unlink(fname);
    },
    checkDirWritable({dirname}){
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
    },
    checkDirExists({dirname, retryCount=0, MAX_RETRY_COUNT=2}){
        return new Promise( async (resolve, reject) => {
            try {
                if(retryCount < MAX_RETRY_COUNT){
                    console.log(`check directory exists [${dirname}][retry count=${retryCount}]`);
                    const success = await file.checkDirWritable({dirname});
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
                    await file.checkDirExists({dirname, retryCount, MAX_RETRY_COUNT});
                }
            }
        })
    }
}

const fp = {
    throttle(duration, fn){
        console.log(duration, fn)
        let timer = null;
        return (...args) => {
            if(!timer){
                timer = setTimeout(() => {
                    console.log(`throttled:`, args)
                    fn(...args);
                    timer = null;
                }, duration)
            }
        }
    },
    times(fn, {count=10, sleep=0}){
        let processed = 0;
        return (...args) => {
            const timer = setInterval(() => {
                console.log(processed);
                if(processed > count) {
                    clearInterval(timer);
                    return
                }
                fn(...args)
                processed++
            , sleep})
        }

    },    
}

const browserStorage = {
    storage : null,
    storageAvailable : (type) => {
        try {
            const storage = window[type];
            const TEST_TEXT = 'setItem test';
            storage.setItem('testText', TEST_TEXT);
            storage.removeItem('testText');
            console.log(this)
            browserStorage.use(type);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    use : type => this.storage = window[type],
    get : key => this.storage.getItem(key),
    set : (key, value) => this.storage.setItem(key, value),
    delete : key => this.storage.removeItem(key),
    clear: () => this.storage.clear()
}

module.exports = {
    browserStorage,
    clone,
    fp,
    file,
    number,
}

// const trottled = fp.throttle(100, console.log);
// const looplog = fp.times(trottled, {count:100, sleep:100});
// looplog('ryuken')
