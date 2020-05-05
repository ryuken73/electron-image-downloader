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
            storage.setItem(testText, TEST_TEXT);
            storage.removeItem(testText);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    create : type => this.storage = window[type],
    get : key => this.storage.getItem(key),
    set : (key, value) => this.storage.setItem(key, value),
    delete : key => this.storage.removeItem(key),
    clear: () => this.storage.clear()
}

module.exports = {
    number,
    fp,
    browserStorage
}

// const trottled = fp.throttle(100, console.log);
// const looplog = fp.times(trottled, {count:100, sleep:100});
// looplog('ryuken')
