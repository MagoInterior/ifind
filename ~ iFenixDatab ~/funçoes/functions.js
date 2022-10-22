const cfonts = require("cfonts")
const moment = require("moment-timezone")
const axios = require('axios')
const mimetype = require('mime-types')

function getExtension(type) {
	return mimetype.extension(type)
}

function getRandom(ext) {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};

function convertSticker(base64, author, pack){
    return new Promise((resolve, reject) =>{
   axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
       method: 'POST',
       headers: {
         Accept: 'application/json, text/plain, */*',
         'Content-Type': 'application/json;charset=utf-8',
         'User-Agent': 'axios/0.21.1',
         'Content-Length': 151330
       },
       data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
     }).then(({data}) =>{
       resolve(data.webpBase64)
     }).catch(reject)
        
    }) 
   }

const banner = cfonts.render(('iFenix Pro|Robot'), {
font: 'block',
color: 'candy',
align: 'center',
gradient: ["red","blue"],
lineHeight: 3
});

const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})




const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00"){
var time = '☆ Boa madruga ☆'
}
if(time2 > "05:30:00"){
var time = '☆ Bom dia ☆'
}
if(time2 > "12:00:00"){
var time = '☆ Boa tarde ☆'
}
if(time2 > "19:00:00"){
var time = '☆ Boa noite ☆'
}
const timee = moment.tz("America/Sao_Paulo").format("HH:mm:ss")

const banner2 = cfonts.render((`${time} ${timee}`), {
font: "console",
align: "center",
})

module.exports = {
banner,
banner2,
convertSticker,
getExtension,
getRandom
}