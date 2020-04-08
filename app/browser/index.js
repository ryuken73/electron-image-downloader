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

    await currentPage.setViewport({width, height});

    return {browser, currentPage};

}

    console.log('pass--2');


const whiteList = [
    'image',
    'image/jpeg'
];


const attachEventListenerToPage = (event, handler, page) => {
    console.log('event mgmt called : y', page)
    page.on(event, handler);
}

const detachEventListenerFromPage = (event, handler, page) => {
    console.log('event mgmt called : n')
    page.removeListener(event, handler);
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

    // listener for request must be attached before page.goto
    page.on('request', async (request) => {
        const url = request.url();
        requestMap.set(url, index++);
    })

    console.time('goto');
    await page.goto(url);  
    console.timeEnd('goto');

    // const message = `track ? (y/n) :`
    // console.log(message);
    // const stdinReader = process.stdin;
    // stdinReader.on('data' , (buff) => {
    //     const EVENT = 'response';
    //     const ans = buff.toString().slice(0,1);
    //     ans === 'y' && attachEventListenerToPage(EVENT, handler, page);
    //     ans === 'n' && detachEventListenerFromPage(EVENT, handler, page);
    //     console.log(message);
    // })
    console.log(browser.process().pid)
    return {page, browser};
}


const attachListener = (page) => {
    console.log(page);
    page.responseHandler = responseHandler(page);
    attachEventListenerToPage('response', page.responseHandler, page);
}

const detachListener = (page) => {
    console.log(page);
    detachEventListenerFromPage('response', page.responseHandler, page);
}

// const url = 'https://eguru.tumblr.com/post/188921110492/%EA%B7%80%EB%A9%B8%EC%9D%98-%EC%B9%BC%EB%82%A0-1%EA%B6%8C'



module.exports = {
    launch,
    startTracking: attachListener,
    stopTracking: detachListener
}

// start(url, requestMap)




