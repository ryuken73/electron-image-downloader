const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const checkDirExists = require('./checkDirExist');
const saveFile = require('./saveFile');
const config = require('./config.json');
const SAVE_DIRECTORY = 'c:/temp/image';
const DEFAULT_PAGE_TIMEOUT = 60000;
// const browserEventHandler = require('./plugins/browserEventHandler');
// const pageEventHandler = require('./plugins/pageEventHandler');

const attachListenerToPage = (page => {
    page.on('frameattached', ()=> console.log('frameattached'));
    // only fired when page initially loaded
    page.on('domcontentloaded', () => console.log('page domloaded:',page.url()));    
    page.on('load', () => console.log('page loaded:',page.url()));
    //

})

const getLastStringBySep = ({str, sep=' '}) => {
    console.log(`get lastString : ${str}`)
    return str.split(sep).pop();
}

const getFirstStringBySep = ({str='', sep=' '}) => {
    console.log(`get firstString : ${str}`)
    return str.split(sep).shift();
}

const launchBrowser = async (url, width, height) => {
    const widthToNumber = isNaN(Number(width)) ? 800 : Number(width);
    const heightToNumber = isNaN(Number(height)) ? 600 : Number(height);
    console.log({widthToNumber, heightToNumber})
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: config.browserLaunchOptions ,
    })

    const pages = await browser.pages();
    const currentPage = pages[0];  

    await currentPage.setViewport({width:widthToNumber, height:heightToNumber});
    return {browser, currentPage};

}

console.log('pass--2');

const targetCreatedHandler = browser => async (target) => {
    console.log('targetcreated event occurred', target.type());
    const IS_NEW_PAGE_EVENT = target.type() === 'page';
    const page = IS_NEW_PAGE_EVENT && await target.page();
    const {width, height, defaultTimeout} = browser.pageOptions;
    page.setDefaultTimeout(defaultTimeout);
    page.setViewport({width, height});

    const {genTrackFilter} = browser;
    trackRequest.start(page, genTrackFilter);
}

const whiteList = [
    'image',
    'image/jpeg'
];


// const attachEventListenerToPage = (event, handler, page) => {
//     console.log('event mgmt called : y', page)
//     page.on(event, handler);
// }

// const detachEventListenerFromPage = (event, handler, page) => {
//     console.log('event mgmt called : n')
//     page.removeListener(event, handler);
// }

const requestHandler = page => (request) => {
        const url = request.url();
        requestMap.set(url, index++);
}

const allowedByWhiteList = (response, whiteList) => {
    const responseHeaders = response.headers();
    const [type, ext] = responseHeaders['content-type'] ? responseHeaders['content-type'].split('/'):[]
    console.log(`filter response : ${type}, ${ext}`);
    const isAllowed = whiteList.includes(type) || whiteList.includes(`${type}/${ext}`);                
    return {success:isAllowed, type, ext}
}

const applyFilter = async (trackFilter, response) => {
    const filterResult = {allowed:null, requestUrl:null, responseHeaders:null, blockFilter:null};
    // check name pattern matching
    const requestUrl = response.url();
    if(!trackFilter.get('nameFilter')(requestUrl)) return {...filterResult, allowed:false, blockFilter:'nameFilter'};

    // check content-type matching
    const responseHeaders = response.headers();
    if(!trackFilter.get('typeFilter')(responseHeaders)) return {...filterResult, allowed:false, blockFilter:'typeFilter'};
  
    // check size 
    const buff = await response.buffer();  
    if(!trackFilter.get('sizeFilter')(buff.length)) return {...filterResult, allowed:false, blockFilter:'sizeFilter'};
    
    // const index = requestMap.get(requestUrl);
    // const requestedFname = getFirstStringBySep({str:getLastStringBySep({str: requestUrl, sep: '/'}), sep:'?'});
    // const [type, ext] = responseHeaders['content-type'] ? responseHeaders['content-type'].split('/'):[];
    return {
        allowed: true,
        requestUrl,
        responseHeaders,
        buff
    }
}

const mkFname = async (requestUrl, responseHeaders) => {
    try {
        const index = requestMap.get(requestUrl);
        const requestedFname = getFirstStringBySep({str:getLastStringBySep({str: requestUrl, sep: '/'}), sep:'?'});
        const filename = requestedFname || index;
        // if(!requestedFname) {
        //     console.error('filename empty. return request index number...');
        //     return {};
        // }
        const [type, ext] = responseHeaders['content-type'] ? responseHeaders['content-type'].split('/'):[];
        await checkDirExists({dirname:SAVE_DIRECTORY});
        const fname = path.join(SAVE_DIRECTORY, `${index}_${filename}.${ext}`);
        return {fname, index};
    } catch (err) {
        console.error('something wrong:', err);
        return {};
    }

}

const responseHandler = (page, trackFilters) => async (response) => {
    try {
        // trackFilters : filter functions(typeFilter, sizeFilter, nameFilter)
        const status = response.status();
        const IS_STATUS_REDIRECTED = (status >= 300) && (status <= 399);
        if(IS_STATUS_REDIRECTED) return;

        const {allowed, requestUrl, responseHeaders, buff, blockFilter} = await applyFilter(trackFilters, response);
        console.log(allowed, requestUrl, responseHeaders);
        if(!allowed) {
            console.log('not allowed, skip...: ',blockFilter);
            return;
        }
        const {fname, index} = await mkFname(requestUrl, responseHeaders);
        if(!fname) {
            console.log('filename make failed! skip...');
            return;
        }
        console.log(`[${index}][${fname}]allowed...saving...`);

        const success = await saveFile({fname, buff});
        if(success) {
            console.log(`[${index}][${fname}]saved`);
            page.emit('saveFile', fname);
            return
        }
        console.log(`[${index}][${fname}]failed!!`);
        return
    } catch (err) {
        console.error(err);
        // process.exit();
        console.log('there is something wrong to get response!')
    }
};


let index = 1;
const requestMap = new Map();

const launch = async (options) => {
    const {url='https://www.google.com', width=800, height=600} = options;
    const {browser, currentPage:page} = await launchBrowser(url, width, height);
    
    //set default page properties on browser objects to apply to new child window 
    browser.pageOptions = {};
    browser.pageOptions.width = width;
    browser.pageOptions.height = height;
    browser.pageOptions.defaultTimeout = DEFAULT_PAGE_TIMEOUT;
    
    page.setDefaultTimeout(DEFAULT_PAGE_TIMEOUT);
    attachListenerToPage(page);
    // page.on('request', requestHandler(page));

    // listener for request must be attached before page.goto
    // trackRequest(page);

    // listener for request must be attached before page.goto
    // page.on('request', async (request) => {
    //     const url = request.url();
    //     requestMap.set(url, index++);
    // })

    console.time('goto');
    await page.goto(url);  
    console.timeEnd('goto');
    console.log(browser.process().pid)

    return {page, browser};
}
const trackRequest = {
    start(page, genTrackFilter){
        const trackFilters = genTrackFilter();
        page.requestHandler = requestHandler(page);
        page.responseHandler = responseHandler(page, trackFilters);
        page.on('request', page.requestHandler);
        page.on('response', page.responseHandler);
        return true
    },
    stop(page){
        page.removeListener('response', page.responseHandler);
        page.removeListener('request', page.requestHandler);
        return true
    }
}

const startTracking = (page) => {
    return (genTrackFilter) => {
        console.log('start tracking page');
        return trackRequest.start(page, genTrackFilter);
    }
}

const stopTracking = (page) => {
    return () => {
        console.log(page);
        return trackRequest.stop(page);
    }
}

const startTrackingAll = (browser) => {
    return async (genTrackFilter) => {
        console.log('start tracking browser (automatically track on child window)')
        const pages = await browser.pages();
        //attach getTrackFilter to browser to use, new create child tab
        browser.genTrackFilter = genTrackFilter;
        // track response currently existing tab
        const requestStartTracking = pages.map(page => startTracking(page)(genTrackFilter));
        // attach event listen for future child tab
        browser.targetCreatedHandler = targetCreatedHandler(browser);
        browser.on('targetcreated', browser.targetCreatedHandler);
        return requestStartTracking.every(result => result === true);
    }
}

const stopTrackingAll = (browser) => {
    return async () => {
        const pages = await browser.pages();
        const requestStopTracking = pages.map(page => stopTracking(page)());
        browser.removeListener('targetcreated', browser.targetCreatedHandler);
        return requestStopTracking.every(result => result === true);
    }
}

const startTrack = (puppetInstance) => {
    const IS_BROWSER = puppetInstance.target().type() === 'browser';
    if(IS_BROWSER) return startTrackingAll(puppetInstance);
    return startTracking(puppetInstance)
}

const stopTrack = (puppetInstance) => {
    const IS_BROWSER = puppetInstance.target().type() === 'browser';
    if(IS_BROWSER) return stopTrackingAll(puppetInstance);
    return stopTracking(puppetInstance);
}

const mkTrackFilter = (options) => {
    return () => {
        const trackFilters = new Map();
        const {contentTypes=[], contentSizeMin=0, contentSizeMax=1024000, urlPatterns=[]} = options;
        const typeFilter = responseHeaders => {
            const [type, ext] = responseHeaders['content-type'] ? responseHeaders['content-type'].split('/'):[];
            return contentTypes.includes(type) || contentTypes.includes(`${type}/${ext}`);
        }
        const sizeFilter = size => {
            console.log(size, contentSizeMin, contentSizeMax);
            return size > contentSizeMin && size < contentSizeMax;
        }
        const nameFilter = url => {
            if(urlPatterns.includes('*')) return true;
            return urlPatterns.includes(url);
        }
        trackFilters.set('typeFilter', typeFilter);
        trackFilters.set('sizeFilter', sizeFilter);
        trackFilters.set('nameFilter', nameFilter);
        return trackFilters;
    }
}

module.exports = {
    launch,
    mkTrackFilter,
    startTrack,
    stopTrack
}





