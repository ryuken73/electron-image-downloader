const puppeteer = require('puppeteer');
const { EventEmitter } = require('events');
const path = require('path');
const saveFile = require('./saveFile');
const imageUtil = require('./imageUtil');
const utils = require('../utils');

const config = require('./config.json');

const toNumber = (value, defaultValue) => {
    return isNaN(Number(value)) ? defaultValue : Number(value);
}

const head = array => array[0];
const tail = array => array[array.length - 1];

const applyFilter = async (trackFilter, response) => {
    const filterResult = {
        allowed:null, 
        requestUrl:null, 
        responseHeaders:null, 
        blockFilter:null
    };
    // check name pattern matching
    const requestUrl = response.url();
    if(!trackFilter.get('nameFilter')(requestUrl)) 
    return {...filterResult, allowed:false, blockFilter:'nameFilter'};

    // check content-type matching
    const responseHeaders = response.headers();
    if(!trackFilter.get('typeFilter')(responseHeaders)) 
    return {...filterResult, allowed:false, blockFilter:'typeFilter'};
  
    // check size 
    const buff = await response.buffer();  
    if(!trackFilter.get('sizeFilter')(buff.length)) 
    return {...filterResult, allowed:false, blockFilter:'sizeFilter'};
    
    return {
        allowed: true,
        requestUrl,
        responseHeaders,
        buff
    }
}

const getLastStringBySep = ({str, sep=' '}) => {
    console.log(`get lastString : ${str}`)
    return str.split(sep).pop();
}

const getFirstStringBySep = ({str='', sep=' '}) => {
    console.log(`get firstString : ${str}`)
    return str.split(sep).shift();
}

const mkFname = async (page, requestUrl, request) => {
    try {
        
        const index = page.requestMap.get(request);


        if(extname === ''){
            console.log('No file extension. skip....');
            return {};
        }        
        const filename = `${index}${extname}`;
        console.log(`${filename}`)
        await utils.file.checkDirExists({dirname:SAVE_DIRECTORY});
        
        const tmpName = path.join(SAVE_DIRECTORY, filename);
        console.log(tmpName)
        return {tmpName, index};
    } catch (err) {
        console.error('something wrong:', err);
        return {};
    }
}

class Browser extends EventEmitter {
    constructor(options){
        super();
        this.width = toNumber(options.width, 800);
        this.height = toNumber(options.height, 600);
        this.tempDir = options.tempDir;
        this.pageTimeout = toNumber(options.defaultTimeout, 60000);
        this.launchOptions = {
            headless: options.headless || false,
            devtools: options.devtools || false,
            executablePath: options.executablePath|| 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            args: config.browserLaunchOptions ,
        }           
        this.browser = null;
        this.pages = new Map();
        this.pageIndex = 0;
        this.pageEventHandler = new Map();
        this.browserEventHandler = new Map();
        this.trackFilters = null;
    }
    _nextPageIndex = () => (new Date()).getTime()
    _addPageList = page => {
        const nextIndex = this._nextPageIndex();
        this.pages.set(nextIndex, page);
        page._indexNumber = nextIndex;
        return nextIndex;
    }
    _delPageFromList = pageIndex => {
        this.pages.delete(pageIndex);
    }
    _getRemovedPageIndex = remainPages => {
        const beforePages = this.pages.values();
        const removedPage = [...beforePages].find(page => !remainPages.includes(page))
        return this._getPageIndex(removedPage);
    }
    _getPageIndex = page => page._indexNumber;
    _setPageViewport = page => page.setViewport({width:this.width, height:this.height});
    _setDefaultTimeout = page => page.setDefaultTimeout(this.pageTimeout);
    _initRequestMap = page => {
        // requestMap will be used to order response (image file name index is based on request index(order))
        page.requestMap = new Map();
        console.log(`initialized request map of page : ${this._getPageIndex(page)}`);
        page.requestIndex = 0;
        page.getNextRequestIndex = () => page.requestIndex++;
    } 
    _setPageEventHandler = page => [...this.pageEventHandler].map(([event, handler]) => {
        console.log(`setting page Event handler for ${event}`);
        page.on(event, handler)
    })
    _setDefaultBrowserEventHandler = () => [...this.browserEventHandler].map(([event, handler]) => {
        console.log(`setting brwoser Event handler for ${event}`);
        this.on(event, handler)
    })

    _requestHandler = page => request => {
        console.log(`add request map of page : ${this._getPageIndex(page)} : ${request.url()}`);
        // sometimes, there is responses with no previous request.
        // it seems that when app is busy, page.on('request') not called
        // TODO : need to check really page.on('request') is not called! 
        page.requestMap.set(request, page.getNextRequestIndex());
    }
    _responseHandler = (page, trackFilters) => async response => {
        try {
            const pageIndex = this._getPageIndex(page);
            console.log(`response arrived! : size of request Map[${pageIndex}]: ${page.requestMap.size} : req : ${response.url()}`);
            // console.log(trackFilters)
            // trackFilters : filter functions(typeFilter, sizeFilter, nameFilter)
            const request = response.request();
            const status = response.status();
            const IS_STATUS_REDIRECTED = (status >= 300) && (status <= 399);
            if(IS_STATUS_REDIRECTED) return;
    
            const {allowed, requestUrl, responseHeaders, buff, blockFilter} = await applyFilter(trackFilters, response);
            console.log(allowed, requestUrl, responseHeaders);
            if(!allowed) {
                console.log('not allowed, skip...: ',blockFilter, response.url());
                page.requestMap.delete(request);
                return;
            }
            const requestIndex = page.requestMap.get(request);
            if(requestIndex === undefined) {
                console.error(`response which cannot be mapped with request Map(not added) arrived :  Map[${pageIndex}], ${response.url()}`);
            }
            const requestFname = getFirstStringBySep({str:getLastStringBySep({str: requestUrl, sep: '/'}), sep:'?'});
            const metadata = await imageUtil.getMetadata(buff);
            const extname = path.extname(requestFname) || `.${metadata.format}`;
            const filename = `${pageIndex}_${requestIndex}${extname}`;
            await utils.file.checkDirExists({dirname:this.tempDir});           
            const tmpName = path.join(this.tempDir, filename);
        
            if(!tmpName) {
                console.log('filename make failed! skip...');
                page.requestMap.delete(request);
                return;
            }
            console.log(`[${pageIndex}][${requestIndex}][${tmpName}]allowed...saving...`);
            // const metadata = await imageUtil.getMetadata(buff);
            const tmpFname = path.basename(tmpName);
            metadata.reqIndex = requestIndex;
            metadata.reqUrl = requestUrl;
            console.log(metadata, tmpFname)
    
            const success = await saveFile({fname:tmpName, buff});
            // saveFile({fname:`c:/temp/image/${index}.jpg`, buff:displaySrc});
            if(success) {
                console.log(`[${pageIndex}][${requestIndex}][${tmpName}]saved`);
                page.requestMap.delete(request);
                page.emit('saveFile', {pageIndex, tmpSrc:tmpName, tmpFname, metadata});
                return
            }
            console.log(`[${pageIndex}][${requestIndex}][${tmpName}]failed!!`);
            page.requestMap.delete(request);
            return
        } catch (err) {
            console.error(err);
            // process.exit();
            console.log('there is something wrong to get response!');
            // requestMap.delete(request);
        }        
    }
    _setRequestHandler = (handler, page)=> {
        page.requestHandler = handler(page);
        page.on('request', page.requestHandler);
        console.log(`request handler registered for ${this._getPageIndex(page)}`);
    }
    _setResponseHandler = (handler, page, trackFilters)  => {
        page.responseHandler = handler(page, trackFilters);
        page.on('response', page.responseHandler);
        console.log(`response handler registered for ${this._getPageIndex(page)}`);
    } 
    _setStartTrackFunction = page => {
        page.startTrack = (trackFilters)  => {
            console.log('startTrack')
            this._setRequestHandler(this._requestHandler, page)
            this._setResponseHandler(this._responseHandler, page, trackFilters);
        }
    }
    _setStopTrackFunction = page => {
        page.stopTrack = () => {
            console.log('stopTrack')
            page.removeListener('request', page.requestHandler);
            page.removeListener('response', page.responseHandler);
        }
    }

    _initPage = page => {
        console.log('init page : set default timeout, init request map, and set trackfunction and so on.');
        const pageIndex = this._addPageList(page);
        this._setPageViewport(page);
        this._setDefaultTimeout(page);
        this._initRequestMap(page);
        this._setPageEventHandler(page);
        this._setStartTrackFunction(page);
        this._setStopTrackFunction(page);
        return pageIndex;
    }

    _startTrackPage = (trackFilters, pageIndex) => this.pages.get(pageIndex).startTrack(trackFilters);
    _startTrackBrowser = trackFilters => {
        // attach current trackFilters to browser object to use later in targetcreated event handler
        this.trackFilters = trackFilters;
        // start track currently existing tab
        [...this.pages.values()].map(page => page.startTrack(trackFilters));
    }
    _stopTrackPage = (pageIndex) => this.pages.get(pageIndex).stopTrack();
    _stopTrackBrowser = () => {
        this.trackFilters = null;
        [...this.pages.values()].map(page => page.stopTrack());
    }


    launch = async url => {
        this.browser = await puppeteer.launch(this.launchOptions);
        this.browser.on('disconnected', () => {console.log('disconnected');this.emit('disconnected')});
        this.browser.on('targetcreated', async target => {
            if(target.type() !== 'page') return;
            const page = await target.page();
            // await page.waitForNavigation({waitUntil:'domcontentloaded'});
            // setRequestInterception does not block page.on('request') event
            // it just hold request not to be sent out!
            await page.setRequestInterception(true);
            const title = await page.title();
            const pageIndex = this._initPage(page); 
            console.log(`request paused![${pageIndex}]`)
            console.log(`*** new target created : ${pageIndex}`);
            this.emit('pageAdded', {pageIndex, title});
            this.trackFilters && this._startTrackPage(this.trackFilters, pageIndex);
            await page.setRequestInterception(false);
            console.log(`request resumed![${pageIndex}]`);
        });

        this._setDefaultBrowserEventHandler();
        const pages = await this.browser.pages();
        console.log('await pages done')
        const page = head(pages);
        console.log(page)
        const pageIndex = this._initPage(page);
        console.log(`added new page : ${pageIndex}`);
        console.time('goto');
        await page.goto(url);  
        console.timeEnd('goto');
        const title = await page.title();
        this.emit('pageAdded', {pageIndex, title});
        
        this.browser.on('targetchanged', async target => {
            if(target.type() !== 'page') return;
            try {
                const page = await target.page();
                // await page.waitForNavigation({waitUntil:'domcontentloaded'});
                const pageIndex = this._getPageIndex(page);
                const title = await page.title();
                console.log(`************* page changed : ${page} ${pageIndex} ${title}`);
                this.emit('titleChanged', {pageIndex, title});
                // sometimes, 'titleChange' emit empty string.
                // so, need to wait for title element 
                page
                .waitForSelector('title')
                .then(async () => {
                    const title = await page.title();
                    this.emit('titleChanged', {pageIndex, title})
                });
            } catch (err) {
                console.error(err);
            }
        })
        this.browser.on('targetdestroyed', async target => {
            console.log('page closed: ', target.type);
            try {
                const remainPages = await this.browser.pages();
                const removedPageIndex = this._getRemovedPageIndex(remainPages)
                this._delPageFromList(removedPageIndex);
                this.emit('pageClosed', removedPageIndex);
            } catch (err) {
                console.error(err);
            }
        })

    }

    delFile = async (fname) => {
        return await utils.file.delete(fname);
    }
    registerPageEventHandler = (event, handler) => this.pageEventHandler.set(event, handler);
    registerBrowserEventHandler = (event, handler) => this.browserEventHandler.set(event, handler);

    startTrack = (trackFilter, pageIndex) => {   
        console.log('start track:',this.pages.has(pageIndex))     
        pageIndex === undefined ? 
        this._startTrackBrowser(trackFilter):
        this.pages.has(pageIndex) && this._startTrackPage(trackFilter, pageIndex)
    }

    stopTrack = (pageIndex) => {
        pageIndex === undefined ? 
        this._stopTrackBrowser():
        this.pages.has(pageIndex) && this._stopTrackPage(pageIndex)
    }

    mkTrackFilter = (options) => {
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
            const matches = urlPatterns.map(urlPattern => {
                return url.includes(urlPattern);
            })
            console.log('matches:', matches)
            return matches.some(match => match === true);
        }
        trackFilters.set('typeFilter', typeFilter);
        trackFilters.set('sizeFilter', sizeFilter);
        trackFilters.set('nameFilter', nameFilter);
        return trackFilters;
    }
}

const initBrowser = (options) => {
    return new Browser(options);
}

module.exports = {
    initBrowser
}