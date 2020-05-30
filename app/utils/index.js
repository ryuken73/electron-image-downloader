const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

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
    async move(srcFile, dstFile){
        const dstDirectory = path.dirname(dstFile);
        const dstDirExists = await file.checkDirExists({dirname:dstDirectory});
        console.log(`dstDirExists : ${dstDirExists}`);

        try {
            console.log(`dstDirExists : ${dstDirExists}`);
            await fs.promises.rename(srcFile, dstFile); 
            return true            
        } catch (error) {
            console.error(error);
            if(error.code === 'EXDEV'){
                await fs.promises.copyFile(srcFile, dstFile);
                await fs.promises.unlink(srcFile);
                return true;
            } else {
                throw error;
            }
        }
    },
    async copy(srcFile, dstFile){
        const dstDirectory = path.dirname();
        const dstDirExists = await file.checkDirExists({dirname:dstDirectory});
        if(dstDirExists) return fs.promises.copyFile(srcFile, dstFile);
        return Promise.reject();

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
                        console.log('end checkDirExists');
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
                    const result = await file.checkDirExists({dirname, retryCount, MAX_RETRY_COUNT});
                    resolve(true);
                }
            }
        })
    }
}

const fp = {
    throttle(duration, fn){
        let timer = null;
        return (...args) => {
            if(timer === null){
                timer = setTimeout(() => {
                    fn(...args);
                    timer = null;
                }, duration)
            }
        }
    },
    debounce(duration, fn){
        let timer = null;
        return (...args) => {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            }, duration)
        }
    },
    throttleButLastDebounce(throttleDuration, fn){
        let throttleTimer = null;
        let debounceTimer = null;
        return (...args) => {
            if(debounceTimer) clearTimeout(debounceTimer);
            if(throttleTimer === null){
                throttleTimer = setTimeout(() => {
                    fn(...args);
                    throttleTimer = null;
                }, throttleDuration)
            } 
            debounceTimer = setTimeout(() => {
                fn(...args);
                debounceTimer = null;
            }, throttleDuration + 100)


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
    delayedExecute(fn, delay){
        return async (...args) => {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        fn(...args);
                        resolve(true);        
                    }, delay)
                } catch(err) {
                    reject(err);
                }
            })
        }
    }  
}

const browserStorage = {
    storage : null,
    // storageAvailable : (type) => {
    init : (type) => {
        try {
            const storage = window[type];
            const TEST_TEXT = 'setItem test';
            storage.setItem('testText', TEST_TEXT);
            storage.removeItem('testText');
            console.log(this)
            browserStorage._use(type);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    _use : type => this.storage = window[type],
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
