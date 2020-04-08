const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const checkDirExists = require('./checkDirExist');
const saveFile = require('./saveFile');
const config = require('./config.json');
const SAVE_DIRECTORY = 'c:/temp/image';
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

const allowedByWhiteList = (response, whiteList) => {
    const responseHeaders = response.headers();
    const [type, ext] = responseHeaders['content-type'] ? responseHeaders['content-type'].split('/'):[]
    console.log(`filter response : ${type}, ${ext}`);
    const isAllowed = whiteList.includes(type) || whiteList.includes(`${type}/${ext}`);                
    return {success:isAllowed, type, ext}
}

const launchBrowser = async (url, width, height) => {
    const widthToNumber = Number(width) === NaN ? 800 : Number(width);
    const heightToNumber = Number(height) === NaN ? 600 : Number(height);
    console.log({widthToNumber, heightToNumber})
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: config.browserLaunchOptions ,
    })

    // browser.on('targetchanged', browserEventHandler['onTargetChanged']);
    // browser.on('targetcreated', browserEventHandler['onTargetCreated']);

    const pages = await browser.pages();
    const currentPage = pages[0];  

    await currentPage.setViewport({width:widthToNumber, height:heightToNumber});

    return {browser, currentPage};

}

console.log('pass--2');



const targetCreatedHandler = browser => async(target) => {
    console.log('targetcreated event occurred', target.type());
    const IS_NEW_PAGE_EVENT = target.type() === 'page';
    const page = IS_NEW_PAGE_EVENT && await target.page();
    trackRequest(page);
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

const responseHandler = page => async (response) => {
    try {
        const status = response.status()
        if ((status >= 300) && (status <= 399)) {
          console.log('Redirect from', response.url(), 'to', response.headers()['location'])
          return;
        }
        const requestUrl = response.url();
        const index = requestMap.get(requestUrl);
        const requestedFname = getFirstStringBySep({str:getLastStringBySep({str: requestUrl, sep: '/'}), sep:'?'});
        if(!requestedFname) {
            console.error('filename empty. skip....');
            return;
        }
        const {success:isAllowed, type, ext} = allowedByWhiteList(response, whiteList);
        if(!isAllowed) return;
        console.log(`[${index}][${requestedFname}]allowed...saving...`);
        await checkDirExists({dirname:SAVE_DIRECTORY});
        const fname = path.join(SAVE_DIRECTORY, `${index}_${requestedFname}.${ext}`);
        const buff = await response.buffer();        
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
    page.setDefaultTimeout(60000);
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
    start(page){
        page.requestHandler = requestHandler(page);
        page.responseHandler = responseHandler(page);
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
    return () => {
        console.log(page);
        return trackRequest.start(page);
    }
}

const stopTracking = (page) => {
    return () => {
        console.log(page);
        return trackRequest.stop(page);
    }
}

const startTrackingAll = (browser) => {
    return async () => {
        const pages = await browser.pages();
        const requestStartTracking = pages.map(page => startTracking(page)());
        return requestStartTracking.every(result => result === true);
    }
}

const stopTrackingAll = (browser) => {
    return async () => {
        const pages = await browser.pages();
        const requestStopTracking = pages.map(page => stopTracking(page)());
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

module.exports = {
    launch,
    startTrack,
    stopTrack
}





