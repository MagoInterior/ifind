const { //BY LZ MODS OFICIAL
default: WAConnection, //BY LZ MODS OFICIAL
MessageType, //BY LZ MODS OFICIAL
Presence, //BY LZ MODS OFICIAL
GroupSettingChange, //BY LZ MODS OFICIAL
WA_MESSAGE_STUB_TYPES, //BY LZ MODS OFICIAL
Mimetype, //BY LZ MODS OFICIAL
relayWAMessage, //BY LZ MODS OFICIAL
makeInMemoryStore, //BY LZ MODS OFICIAL
useSingleFileAuthState, //BY LZ MODS OFICIAL
MessageRetryMap, //BY LZ MODS OFICIAL
BufferJSON, //BY LZ MODS OFICIAL
DisconnectReason, //BY LZ MODS OFICIAL
fetchLatestBaileysVersion, //BY LZ MODS OFICIAL
downloadContentFromMessage, //BY LZ MODS OFICIAL
delay //BY LZ MODS OFICIAL
} = require("@adiwajshing/baileys") //BY LZ MODS OFICIAL


// https://youtube.com/lzmodsofc
// https://wa.me/5562991514026

//SE FOR POSTAR DEIXA OS CREDITOS!!
//BY LZ MODS OFICIAL
//https://github.com/lzmodsoficial/iFenixProRobot


const fs = require("fs")
const chalk = require("chalk")
const P = require("pino") 
const axios = require('axios')
const validarCpf = require('cpf-cnpj-validator')
const clui = require("clui")
const fetch = require("node-fetch")
const moment = require("moment-timezone")
const { isFiltered, addFilter } = require('./~ iFenixDatab ~/funçoes/spam')
const { exec, spawn, execSync } = require('child_process');
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
// ====== || Puxar Json De Api's || ====== \\
fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})
})

const antilink = JSON.parse(fs.readFileSync('./~ iFenixDatab ~/antis/antilink.json'))
const welcome = JSON.parse(fs.readFileSync('./~ iFenixDatab ~/funçoes/welcome.json'))

const speed = require("performance-now")
const { color } = require("./~ iFenixDatab ~/funçoes/color")
const { fromBuffer } = require("file-type")
const { banner, banner2, convertSticker, getExtension, getRandom } = require("./~ iFenixDatab ~/funçoes/functions")

let fotododono = "https://telegra.ph/file/1ca3283d208cdbffc9c61.jpg"
var base64ToImage = require('base64-to-image');

// ====== || Hora & Data || ====== \\

const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")

// ====== || Json - Dono Do Bot || ====== \\

const dono = JSON.parse(fs.readFileSync('./dono/configs.json'))

// ====== || Json - Outros || ====== \\

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})


// ====== || Consts - Dono Do Bot || ====== \\

let NomeDoBot = dono.NomeDoBot
let NomeDoDono = dono.NickDoDono
let NumeroDoDono = dono.NumeroDoDono
let prefix = dono.prefix

// ====== || Const's - Menu's || ====== \\

const { resolve } = require("path")
const { StringDecoder } = require("string_decoder")

async function startBot () {
const store = makeInMemoryStore({ logger: P().child({ level: "debug", stream: "store" }) })

// ====== || Conexao - QR CODE || ====== \\
const { state, saveState } = useSingleFileAuthState("./qrcode.json")
console.log(banner.string)
const lz = WAConnection({
logger: P({ level: 'silent' }),
printQRInTerminal: true,
auth: state,
msgRetryCounterMap: MessageRetryMap,
defaultQueryTimeoutMs: undefined, 
keepAliveIntervalMs: 1000 * 60 * 10 * 3
})

lz.ev.on ("creds.update", saveState)
store.bind(lz.ev)
lz.ev.on("chats.set", () => {
})

lz.ev.on("contacts.set", () => {
})


lz.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log(chalk.red("Bot Desconectado!!")), console.log(lastDisconnect.error), console.log(chalk.blue("tentado reconectar?")), console.log(shouldReconnect)

if(shouldReconnect) {
startBot()
}

} else if(connection === "open") {
console.log(chalk.blue("Bot Conectado ao Whatsapp Com Sucesso!"))
console.log(chalk.red(""), chalk.keyword("white")("( Sistema )"), chalk.green("Qualquer Bug Favor Reportar Ao CEO > +55 (62) 991514-026"))
}
})

lz.ev.on("messages.upsert", async m => {
try {
const info = m.messages[0]
if (!info.message) return 
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
global.prefix

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

// ====== || Body || ====== \\
var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (info.message.buttonsResponseMessage?.selectedButtonId || info.message.listResponseMessage?.singleSelectReply.selectedRowId || info.text) : ''
var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const args = body.trim().split(/ +/).slice(1)
const isCmd = budy2.startsWith(prefix)
const command = isCmd ? budy2.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

// ====== || Bady || ====== \\
var bady = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectReply.selectedRowId) ? info.message.listResponseMessage.singleSelectReply.selectedRowId: ''

// ====== || Budy || ====== \\
var budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

// ====== || Buttons || ====== \\
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

bidy =budy.toLowerCase()

// ====== || Enviar Mensagem || ====== \\
const reply = (texto) => {
lz.sendMessage(from, { text: texto }, {quoted: info})
} 

const reply2 = (texto) => {
lz.sendMessage(sender, { text: texto }, {quoted: info})
} 

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

// ====== || Enviar Botao Normal Com Imagem || ====== \\
const SendButtonIMG = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
lz.sendMessage(id, buttonMessage, {quoted: vr})
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? lz.sendMessage(from, {text: teks.trim(), mentions: memberr}) : lz.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const NumeroDoBot = lz.user.id.split(":")[0]+"@s.whatsapp.net"
const isGroup = info.key.remoteJid.endsWith("@g.us")
const q = args.join(" ")

// ====== || Detectar Links || ====== \\
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

fts = [
"https://telegra.ph/file/43e11bb4df8b775589b06.jpg",
"https://telegra.ph/file/0e9aeae25982d0f1f383d.jpg",
"https://telegra.ph/file/9f66c688ccc8725557986.jpg",
"https://telegra.ph/file/4fce7c9f2fe461b079519.jpg",
"https://telegra.ph/file/42f99ea5da21bcc639137.jpg",
"https://telegra.ph/file/1c5a51d5154a881871c78.jpg",
"https://telegra.ph/file/9fdfa080ab26b678588b7.jpg",
"https://telegra.ph/file/ed5260749a0d46352c240.jpg",
"https://telegra.ph/file/ab554c3ea77317c6649de.jpg",
"https://telegra.ph/file/cf4ceed72b8155261a5a8.jpg",
"https://telegra.ph/file/a0989fc8a929b95b7b3e3.jpg",
"https://telegra.ph/file/a2304c2d8daa744f5a5ae.jpg",
"https://telegra.ph/file/2482993fb0ea50da52abf.jpg"
] 
const FotosRandomicas_CS = fts[Math.floor(Math.random() * fts.length)]

let ftdobot = "https://telegra.ph/file/5c37fc576961f6b2642cd.jpg"

// ====== || Consts - Grupos || ====== \\
const sender = isGroup ? info.key.participant : info.key.remoteJid

const pushname = info.pushName ? info.pushName : ""

const groupMetadata = isGroup ? await lz.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""

enviar = {
espere: "࿐ Aguarde...enviando ",
dono: "࿐ Esse comando so pode ser usado pelo meu dono!!! ",
grupo: "࿐ Esse comando só pode ser usado em grupo ",
privado: "࿐ Esse comando só pode ser usado no privado ",
adm: "࿐ Esse comando só pode ser usado por administradores de grupo",
botadm: " ࿐ Este comando só pode ser usado quando o bot se torna administrador ",
erro: "࿐ Error, tente novamente mais tarde "
}

let infotxt =  `
🔎 𝑪𝒐𝒏𝒔𝒖𝒍𝒕𝒂𝒔 𝑫𝒆 𝑫𝒂𝒅𝒐𝒔  🔍
📌𝒊𝑭𝒆𝒏𝒊𝒙 𝑪𝒐𝒏𝒔𝒖𝒍𝒕𝒂𝒔

Dados Reais e Atualizados Diretamente De Bases Oficiais!
(cadsus, esus, receitafederal bigdata) e etc

🛡 - Consultas Disponiveis - 🛡

━━━━━━━━━━━━━━━━━━
[+] ${prefix}cpf1 27867260854
━━━━━━━━━━━━━━━━━━
[+] ${prefix}cpf2 27867260854
━━━━━━━━━━━━━━━━━━
[+] ${prefix}cpf3 27867260854
━━━━━━━━━━━━━━━━━━
[+] ${prefix}cpf4 27867260854
━━━━━━━━━━━━━━━━━━
[+] ${prefix}telefone 21971268721
━━━━━━━━━━━━━━━━━━
[+] ${prefix}cnpj 27865757000102
━━━━━━━━━━━━━━━━━━
[+] ${prefix}cep 75255681
━━━━━━━━━━━━━━━━━━
[+] ${prefix}nome Tania Mara Moyses
━━━━━━━━━━━━━━━━━━
[+] ${prefix}placa OGT0458
━━━━━━━━━━━━━━━━━━
[+] ${prefix}bin 498408
━━━━━━━━━━━━━━━━━

- Consultas Gratis!
Veja Abaixo Algumas Informaçoes!

🩸 - Deseja Ter Seu Proprio Site De Consultas Por Um Preço Acessivel?  - 🩸
🩸 - Ou Ate Mesmo Adiquirir Um Plano Da Nossa Api De Consultas De Dados? - 🩸

⚔️ Veja Abaixo Os Nossos Planos!

🩸 - Planos Da Nossa Api - 🩸

Plano: Mensal
Preço: 70 R$

Plano: Trimestral
Preço: 130 R$

Plano: Anual
Preço: 350 R$

🩸 - Plano (Tenha o Seu Proprio Site) - 🩸

- a Combinar Com o CEO

🩸 - Plano (Adicione o Bot a Um Grupo) - 🩸

Plano: Semanal
Preço: 30 R$

Plano: Mensal
Preço: 100 R$

Plano: Trimestral
Preço: 200 R$

🩸 - Plano (Premium No Bot) - 🩸

- Consulte Sem Limites! Adiquira o Premium Em Nosso Bot.

Plano: Semanal
Preço: 50 R$

Plano: Mensal
Preço: 80 R$

agradeço a todos pela escolha e pela confiança!
o CEO (lzmods) Agradece Em Nome De iFenix

🛡 - Contato - 🛡

CEO (lzmods)
wa.me/5562991514026

⚔️ Caso Queira Adiquirir Um De Nossos Planos, Tem Alguma Duvida, Ou Ate Mesmo Reportar Um Bug No Bot Entre Em Contato Imediatamente!! ⚔️

Trabalhando a Cada Dia Para Melhorar Nosso Serviço e Agradar a Todos Nossos Clientes!
Suporte 24/48 Horas
Vem Com Nois q e Sucesso!

🟥 TUDO NOSSO! 🟥
`   

// ====== || Send Others Mensagens || ====== \\

const live = {key : {participant : '0@s.whatsapp.net'},message: {liveLocationMessage: {}}} 
const imgm = {key : {participant : '0@s.whatsapp.net'},message: {imageMessage: {}}}
const vid = {key : {participant : '0@s.whatsapp.net'},message: {videoMessage: {}}}
const contato = {key : {participant : '0@s.whatsapp.net'},message: {contactMessage:{displayName: `${pushname}`}}}
const doc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage:{}}}

// ====== || Consts - Cehck || ====== \\

const isAntiLink = sender.includes(antilink)
const isWelcome = isGroup ? welcome.includes(from) : false

// ====== || Outras Conts || ====== \\
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const nmrdn = dono.NumeroDoDono.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(NumeroDoBot) || false
const isGroupAdmins = groupAdmins.includes(sender) || false 
banChats = true
const isOwner = NumeroDoDono.includes(sender) || isBot
const isOwner2 = nmrdn.includes(sender) || isBot

// ====== || isQuoteds || ====== \\
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage")
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

// ====== || Premium || ====== \\
const premium = JSON.parse(fs.readFileSync('./~ iFenixDatab ~/funçoes/premium.json'));
const isPremium = premium.includes(sender)

//const isprem = `${isPremium? '✓' : '✕'}`
const wame = `wa.me/${sender.split('@')[0]}`

// ====== || Antilink || ====== \\
if (budy.includes("https://") && budy.includes("http://")) {
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return reply(`*${pushname}* vc é admin por isso não vou te banir`)
var NumeroDoAlvo = `${sender.split("@")[0]}@s.whatsapp.net`
 setTimeout( () => {
 reply(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
}, 100)
reply(`*_「 linkdetectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
 setTimeout( () => {
 lz.groupParticipantsUpdate(from, [NumeroDoAlvo], "remove").catch((e) => {reply(`*ERROR:* ${e}`)}) 
}, 10)
setTimeout( () => {

}, 0)
}

if (budy.startsWith('>')){
try {
console.log('[', color('EVAL', 'silver'),']', color(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss'), 'yellow'), color(budy))

return reply(JSON.stringify(eval(budy.slice(2)),null,'\t')) 
} catch (e){
reply(e)
}
}

if (budy.startsWith('=>')){
try {
if(info.key.fromMe) return 
var konsol = budy.slice(3)
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined){
bang = util.format(sul)
}
return reply(bang)
}

reply(util.format(eval(`;(async () => { ${konsol} })()`)))
console.log('\x1b[1;37m>', '[', '\x1b[1;32mEXEC\x1b[1;37m', ']', time, color(">", "green"), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
} catch (e) {
reply(String(e))
}
}

// ====== || Anti Flood De Comandos || ====== \\
if(isOwner) return
if(isGroup && isCmd) {
if(isFiltered(sender)) return reply(`*Aguarde Antes De Poder Usar Outro Comando Novamente.*`)
addFilter(sender)}

const text = args.join(" ")
const c = args.join(' ')

// ====== || Console Logs De Comados || ====== \\

//comandos no grupo
if (isGroup && isCmd)
console.log(chalk.green(""), chalk.keyword("yellow")("[ Comando - GP ]"), chalk.white(`Do Lek:`), chalk.keyword("blue")(`${sender.split("@")[0]}`), chalk.white(`No Grupo:`), chalk.keyword("blue")(`${groupName}`), chalk.yellow(`|`), chalk.white(`Comando:`), chalk.keyword("yellow")(`${prefix + command}`))

//mensagems no grupo
if (isGroup && !isCmd)
console.log(chalk.green(""), chalk.keyword("pink")("[ Mensagem - GP ]"), chalk.white(`Do Lek:`), chalk.keyword("blue")(`${sender.split("@")[0]}`), chalk.white(`No Grupo:`), chalk.keyword("blue")(`${groupName}`))

//comandos no pv
if (!isGroup && isCmd)
console.log(chalk.green(""), chalk.keyword("yellow")("( Comando - PV )"), chalk.white(`Do Lek:`), chalk.keyword("blue")(`${sender.split("@")[0]}`), chalk.red(`|`), chalk.white(`Comando:`), chalk.keyword("yellow")(`${prefix + command}`))

//mensagems no pv
if (!isGroup && !isCmd)
console.log(chalk.green(""), chalk.keyword("pink")("( Mensagem - PV )"), chalk.white(`Do Lek:`), chalk.keyword("blue")(`${sender.split("@")[0]}`))



switch (command) {
// Começo dos comandos com prefix //
///\/\
// (° v °)
// /| |\ 
//V---V
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//


// ====== || Menus || ====== \\

case 'cpf':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch {
SendButtonIMG(from, FotosRandomicas_CS, "⚠️ cpf NÃO ENCONTRADO / INVALIDO!", NomeDoBot, [
{buttonId: `${prefix}cpf_i ${q}`, buttonText: {displayText: `❬ 🌠 ❭ Busca Avançada ❬ 🌠 ❭`}, type: 1}], info)
}
break

case 'cpf_i':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`http://consultar-na-ifind-bylzmods.herokuapp.com/cpf?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply("⚠️ cpf NÃO ENCONTRADO / INVALIDO!")
}
break


case 'cpf4':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf4?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'cpf2':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf2?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'cpf3':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf3?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'nome':
try {
if (q.length < 20) return reply(`➥ INSIRA UM NOME COMPLETO.`)
if (!q) return reply(`exemplo: ${prefix+command} nomedoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o NOME: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
let imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/nome?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch {
SendButtonIMG(from, FotosRandomicas_CS, "⚠️ NOME NÃO ENCONTRADO / INVALIDO!", NomeDoBot, [
{buttonId: `${prefix}nome_i ${q}`, buttonText: {displayText: `❬ 🌠 ❭ Busca Avançada ❬ 🌠 ❭`}, type: 1}], info)
}
break

case 'nome_i':
try {
if (q.length < 20) return reply(`➥ INSIRA UM NOME COMPLETO.`)
if (!q) return reply(`exemplo: ${prefix+command} nomedoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o NOME: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://consultar-na-ifind-bylzmods.herokuapp.com/nome?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})

} catch(err) {
console.log(err)
reply("⚠️ NOME NÃO ENCONTRADO / INVALIDO!")
}
break

case 'tell':
case 'telefone':
case 'tel':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ INSIRA UM NUMERO COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} numerodoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o telefone: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/tell?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
SendButtonIMG(from, FotosRandomicas_CS, "⚠️ TELEFONE NÃO ENCONTRADO / INVALIDO!", NomeDoBot, [
{buttonId: `${prefix}tell_i ${q}`, buttonText: {displayText: `❬ 🌠 ❭ Busca Avançada ❬ 🌠 ❭`}, type: 1}], info)
}
break

case 'tell_i':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ INSIRA UM NUMERO COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} nomedoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o NOME: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://consultar-na-ifind-bylzmods.herokuapp.com/tell?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply("⚠️ NOME NÃO ENCONTRADO / INVALIDO!")
}
break

case 'score':
try {
if (q.length < 11 || q.length > 11) return reply(`➥ CPF INVALIDO! INSIRA UM COM 11 DIGITOS.`)
if (!q) return reply(`exemplo: ${prefix+command} cpfdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o score: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/score?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'placa':
try {
if (q.length < 7 || q.length > 7) return reply(`➥ INSIRA UMA PLACA VALIDA.`)
if (!q) return reply(`exemplo: ${prefix+command} placadocarro`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o NOME: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/detran/placa?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch {
SendButtonIMG(from, FotosRandomicas_CS, "⚠️ PLACA NÃO ENCONTRADA / INVALIDA!", NomeDoBot, [
{buttonId: `${prefix}placa_i ${q}`, buttonText: {displayText: `❬ 🌠 ❭ Busca Avançada ❬ 🌠 ❭`}, type: 1}], info)
}
break

case 'placa_i':
try {
if (q.length < 7 || q.length > 7) return reply(`➥ INSIRA UMA PLACA VALIDA.`)
if (!q) return reply(`exemplo: ${prefix+command} placadocarro`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o NOME: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`http://consultar-na-ifind-bylzmods.herokuapp.com/placa?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply("⚠️ PLACA NÃO ENCONTRADA / INVALIDA!")
}
break

case 'cnpj':
try {
if (!q) return reply(`exemplo: ${prefix+command} cnpj da empresa`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cnpj: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cnpj?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CNPJ NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'bin':
try {
if (!q) return reply(`exemplo: ${prefix+command} bindobanco`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando a bin: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/bin?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ BIN NÃO ENCONTRADA / INVALIDA!`)
}
break

case 'cep':
try {
if (!q) return reply(`exemplo: ${prefix+command} cepdoalvo`)
getQuery = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cep: ${getQuery}`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
imageCS = await getBuffer(FotosRandomicas_CS)
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cep?query=${getQuery}&token=22_na_urna`)
let Dadoskkj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: Dadoskkj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CEP NÃO ENCONTRADO / INVALIDO!`)
}
break

case 'menu':
SendButtonIMG(from, ftdobot, infotxt, NomeDoBot, [
{buttonId: `${prefix}linkgp`, buttonText: {displayText: `🌠 Link Do Grupo 🌠`}, type: 1}], info)
break

case 'donodobot':
case 'dono':
SendButtonIMG(from, fotododono, infodono(prefix, NomeDoDono, NumeroDoDono, NomeDoBot), NomeDoBot, [
{buttonId: `${prefix}menu`, buttonText: {displayText: `🌠 Menu De Comandos 🌠`}, type: 1}], info)
break

case 'limpar':
if(!isGroup) return reply("apenas grupos")
if(!isGroupAdmins) return reply("apenas pra admins")
clear = `🗑️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🗑️\n❲❗❳ *Lɪᴍᴘᴇᴢᴀ ᴅᴇ Cʜᴀᴛ Cᴏɴᴄʟᴜɪ́ᴅᴀ* ✅`
lz.sendMessage(from, {text: clear}, {quoted: info, contextInfo : { forwardingScore: 500, isForwarded:true}})
break

case "gplink":
case "linkgp":
if (!isGroup) return reply("apenas grupos")
if (!groupAdmins) return reply("apenas adm")
if (!isBotGroupAdmins) return reply("o bot tem que ser adm")
const linkk = await lz.groupInviteCode(from)
reply(`࿐ Link do grupo :\nhttps://chat.whatsapp.com/${linkk} `)
break

// ====== || Stickers || ====== \\

case "ban":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
if (info.message.extendedTextMessage != undefined || info.message.extendedTextMessage != null) {
num = info.message.extendedTextMessage.contextInfo.participant
lz.groupParticipantsUpdate(from, [num], "remove")
} else { 
reply("࿐ Marque a mensagem da pessoa que desejas remover")
}
break

case "voltar":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
if (info.message.extendedTextMessage != undefined || info.message.extendedTextMessage != null) {
num = info.message.extendedTextMessage.contextInfo.participant
lz.groupParticipantsUpdate(from, [num], "add")
} else { 
reply("࿐ Marque a mensagem da pessoa que desejas voltar ao grupo")
}
break

case "promover":
case "daradm":
case "ademir":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
if(!budy.includes("@")) {
if (info.message.extendedTextMessage == undefined || info.message.extendedTextMessage == null) return reply(`Marque a mensagem do usuário que deseja promover ele pra administrador ou marque com ${prefix}promover @marcar-ele`)
mentioned = info.message.extendedTextMessage.contextInfo.participant
lz.sendMessage(from, {text: `@${mentioned.split("@")[0]} Foi promovido(a) para [ ADMINISTRADOR ] com sucesso.`, mentions: [mentioned]})
lz.groupParticipantsUpdate(from, [mentioned], "promote")
} else {
if(q.length > 15) return reply('Só pode promover uma pessoa por vez..')
mentioned2 = args.join(" ").replace("@", "") + "@s.whatsapp.net"
lz.sendMessage(from, {text: `@${mentioned2.split("@")[0]} Foi promovido(a) para [ ADMINISTRADOR ] com sucesso.`, mentions: [mentioned2]})
lz.groupParticipantsUpdate(from, [mentioned2], "promote")
}
break

case "demote":
case "tiraradm":
case "katiau":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
if(!budy.includes("@")) {
if (info.message.extendedTextMessage == undefined || info.message.extendedTextMessage == null) return reply(`Marque a mensagem do usuário que deseja promover ele pra administrador ou marque com ${prefix}promover @marcar-ele`)
mentioned = info.message.extendedTextMessage.contextInfo.participant
lz.sendMessage(from, {text: `@${mentioned.split("@")[0]} Foi despromovido(a) a ADM com sucesso.`, mentions: [mentioned]})
lz.groupParticipantsUpdate(from, [mentioned], "demote")
} else {
if(q.length > 15) return reply('Só pode promover uma pessoa por vez..')
mentioned2 = args.join(" ").replace("@", "") + "@s.whatsapp.net"
lz.sendMessage(from, {text: `@${mentioned2.split("@")[0]} Foi despromovido(a) a ADM com sucesso.`, mentions: [mentioned2]})
lz.groupParticipantsUpdate(from, [mentioned2], "demote")
}
break

case 'totag':
case 'cita':
case 'hidetag':
if(!isGroup) return reply('Este comando só deve ser utilizado em Grupo.')
if(!isGroupAdmins) return reply('Você precisa ser ADM pra utilizar este comando')
if(q.includes(`${prefix}`)) return reply("Não pode utilizar comandos nesse comando")
membros = (groupId, membros1) => {
array = []
for (let i = 0; i < membros1.length; i++) {
array.push(membros1[i].id)
}
return array
}
var yd = membros(from, groupMembers)
if(q.length < 1) return reply('Citar oq?')
lz.sendMessage(from, {text: body.slice(command.length + 2), mentions: yd})
break

case "rebaixar":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
if (q < 1) return reply("࿐ Digite o número, animal ")
if (!isBotGroupAdmins) return reply(enviar.botadm)
try {
lz.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "demote")
reply(`࿐ ${q} Foi rebaixado a membro comum com sucesso `)
} catch(e) {
console.log(e)
reply(enviar.erro)
}
break


// Fim dos comandos com prefix //
///\/\
// (° v °)
// /| |\ 
//V---V
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
default:

if (isCmd) {
const ld = `
╭─────────────
│o Comando ${prefix + command} Nao Foi
│Encontrado Em Meu Banco De Dados. 
│
│• Erro: CMD Errado ou inexistente 
│• Data: ${data} 
│• Hora: ${hora}
│
│Use: ${prefix}menu
│
╰─────────────
`
const botoes = [
{buttonId: `${prefix}menu`, buttonText: {displayText: '💥 Menu De Comandos 💥'}, type: 1}
]

const dadoskk = {
text: ld,
footer: NomeDoBot,
buttons: botoes,
headerType: 1
}

await lz.sendMessage(from, dadoskk)
}

}
// Começo dos comandos sem prefix //
///\/\
// (° v °)
// /| |\ 
//V---V
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

if(budy.match('fofo')){
//lz.sendMessage(from,{audio: { url: "./audios/fofo.mp3" }, mimetype: 'audio/mp4' ,ptt: true},{quoted: info})
}

// Fim dos comandos sem prefix //
///\/\
// (° v °)
// /| |\ 
//V---V
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
} catch (e) {
console.log(e)
}

})

}
startBot()