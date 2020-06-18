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
    validType : {
        directory(dirname){
            if(typeof(dirname) === 'string') return true;
            return false;
        }
    },
    async delete(fname){
        return fs.promises.unlink(fname);
    },
    async move(srcFile, dstFile){
        const dstDirectory = path.dirname(dstFile);
        await file.makeDirectory(dstDirectory);
        if(!await file.checkDirExists(dstDirectory)) {
            console.error('target directory to move does not exit');
            return Promise.reject(`directory doesn't exists and creating directory failed. [${dstDirectory}]`);
        }
        try {
            console.log(`dstDirExists : ${dstDirectory}`);
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
        await file.makeDirectory(dstDirectory);
        if(!await file.checkDirExists(dstDirectory)) {
            console.error('target directory to move does not exit');
            return Promise.reject(`directory doesn't exists and creating directory failed. [${dstDirectory}]`);
        }
        return fs.promises.copyFile(srcFile, dstFile);
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
    checkDirExists(dirname){
        return new Promise((resolve, reject) => {
            if(!file.validType.directory(dirname)){
                resolve(false);
                return
            }
            fs.lstat(dirname, (err, stats) => {
                if(err) {
                    resolve(false);
                    return
                }
                stats.isDirectory() && resolve(true);
                !stats.isDirectory() && resolve(false);
            })
        })
    },
    async makeDirectory(dirname){
        if(!file.validType.directory(dirname)){
            return Promise.resolve(false);
        }
        try {
            mkdirp(dirname);
        } catch (err) {
            console.log(err)
            return Promise.resolve(false);            
        }
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
                        const result = fn(...args);
                        resolve(result);        
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

// const main = async () => {
//     const targetDirectory = 'd:/temp/a|b';
//     // console.log(await file.checkDirExists('C:/'));
//     // console.log(await file.checkDirExists('C:/temp'));
//     // console.log(await file.checkDirExists('d:/ttt'));
//     // console.log(await file.checkDirExists({}));
//     console.log(await file.checkDirExists(targetDirectory));

//     console.log(await file.makeDirectory(targetDirectory));
//     console.log(await file.checkDirExists(targetDirectory));

// }

// main()