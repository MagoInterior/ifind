const { //kkk
default: WAConnection,
MessageType,
Presence,
GroupSettingChange,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
makeInMemoryStore,
useSingleFileAuthState,
MessageRetryMap,
BufferJSON, 
DisconnectReason, 
fetchLatestBaileysVersion,
downloadContentFromMessage,
delay
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const P = require("pino") 
const axios = require('axios')
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

let fotoConsultaDeCpf = "https://telegra.ph/file/c8bbb2f5456ccfdc91995.jpg"
let fotoConsultaDeCpf2 = "https://telegra.ph/file/20359c436cb3b3f3f642b.png"
let fotoConsultaDeScore = "https://telegra.ph/file/1e80e777b4b33789b7602.jpg"
let fotoconsultas = "https://telegra.ph/file/43e11bb4df8b775589b06.jpg"
let fotododono = "https://telegra.ph/file/1ca3283d208cdbffc9c61.jpg"

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

const { MenuPrincipal } = require('./menus/menuprincipal.js');

const { infodono } = require('./menus/infodono')
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
console.log(chalk.red(""), chalk.keyword("white")("( Sistema )"), chalk.green("iFenix - MD Versao [1.0]"))
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
[+] ${prefix}cnpj2 27865757000102
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

- a Combinar Com o SEO

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
o SEO (lzmods) Agradece Em Nome De iFenix

🛡 - Contato - 🛡

SEO (lzmods)
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

case 'usuarios-api':
if (!isOwner2) return reply("comando apenas pro meu dono")
getUsersOfSystm = await fetchJson("https://ifenix-api.tk/admin/listadeusuarios")
let infoUsers = `┌ ◪ *[+] iFenix - Rest Api's [+]*
└ *Total De Usuarios:* ${getUsersOfSystm.info.length}\n\n`
for(var i = 0; i < getUsersOfSystm.info.length; i++) {
    infoUsers += `───────────────\n
┌ ❏ *Nome De Usuario:* ${getUsersOfSystm.info[i].nome}
 ❏ *Token:* ${getUsersOfSystm.info[i].token}
└ ❏ *Limit Do Token:* ${getUsersOfSystm.info[i].limit}\n\n`
}
reply(infoUsers)
break

case 'adduser-api':
try {
if (!isOwner2) return reply("comando apenas pro meu dono")
textin = args.join(" ")
txt1 = textin.split("/")[0];
txt2 = textin.split("/")[1];
txt3 = textin.split("/")[2];
if (!textin) return reply(`formato: ${prefix+command} nomedousuario/nomedotoken/limitdotoken`)
if (!txt1) return reply(`formato: ${prefix+command} nomedousuario/nomedotoken/limitdotoken`)
if (!txt2) return reply(`formato: ${prefix+command} nomedousuario/nomedotoken/limitdotoken`)
if (!txt3) return reply(`formato: ${prefix+command} nomedousuario/nomedotoken/limitdotoken`)
createUser = await fetchJson(`https://ifenix-api.tk/admin/adduser?nomeuser=${txt1}&tokenuser=${txt2}&limituser=${txt3}`)
reply("USUARIO ADICIONADO AO BANCO DE DADOS COM SUCESSO!")
getUsersOfSystm = await fetchJson("https://ifenix-api.tk/admin/listadeusuarios")
let infoUsers = `┌ ◪ *[+] iFenix - Rest Api's [+]*
└ *Total De Usuarios:* ${getUsersOfSystm.info.length}\n\n`
for(var i = 0; i < getUsersOfSystm.info.length; i++) {
infoUsers += `───────────────\n
┌ ❏ *Nome De Usuario:* ${getUsersOfSystm.info[i].nome}
 ❏ *Token:* ${getUsersOfSystm.info[i].token}
└ ❏ *Limit Do Token:* ${getUsersOfSystm.info[i].limit}\n\n`
}
reply(infoUsers)
} catch(err) {
console.log(err)
reply("erro no servidor.")
}
break

case 'deluser-api':
try {
if (!isOwner2) return reply("comando apenas pro meu dono")
if (!q) return reply(`formato: ${prefix+command} nomedotoken`)
deleteUser = await fetchJson(`https://ifenix-api.tk/admin/deluser?tokenuser=${q}`)
reply("USUARIO DELETADO DO BANCO DE DADOS COM SUCESSO!")
getUsersOfSystm = await fetchJson("https://ifenix-api.tk/admin/listadeusuarios")
let infoUsers = `┌ ◪ *[+] iFenix - Rest Api's [+]*
└ *Total De Usuarios:* ${getUsersOfSystm.info.length}\n\n`
for(var i = 0; i < getUsersOfSystm.info.length; i++) {
infoUsers += `───────────────\n
┌ ❏ *Nome De Usuario:* ${getUsersOfSystm.info[i].nome}
 ❏ *Token:* ${getUsersOfSystm.info[i].token}
└ ❏ *Limit Do Token:* ${getUsersOfSystm.info[i].limit}\n\n`
}
reply(infoUsers)
} catch(err) {
console.log(err)
reply("erro no servidor.")
}
break

case 'cs':
textin = args.join(" ")
txt1 = textin.split("/")[0];
txt2 = textin.split("/")[1];
if(!textin) return reply("online/offline & motivo")
const isprem = `${isPremium? 'true' : 'false'}`
const isow = `${!isOwner? 'true' : 'false'}`
if (!q) return reply("atv ou dst")
if (!isOwner2) return reply("apenas pro dono")
ajs = {
from: from,
sender: sender,
pushname: pushname,
isPremium: isprem,
system: txt1,
motivo: txt2
}
fs.writeFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`, JSON.stringify(ajs, null, 2))
reply("ok")
break

case 'cep':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
CepDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cep: ${CepDoAlvo}`)
if (!CepDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cep?query=${CepDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfCep = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCep}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'score':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
CpfDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o score: ${CpfDoAlvo}`)
if (!CpfDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/score?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoConsultaDeScore)
let DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cpf4':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
CpfDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${CpfDoAlvo}`)
if (!CpfDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf5?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cpf3':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
CpfDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o score: ${CpfDoAlvo}`)
if (!CpfDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf4?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cpf2':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
CpfDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o score: ${CpfDoAlvo}`)
if (!CpfDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf3?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoConsultaDeScore)
let DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CPF NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cpf':
case 'cpf1':
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
CpfDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cpf: ${CpfDoAlvo}`)
if (!CpfDoAlvo) return reply(`exemplo: ${prefix+command} 02704534314`)
try {
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
} catch(err) {
console.log(err)
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cpf?query=${CpfDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfCpf = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCpf}, {quoted: info})
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'nome':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
NomeDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o nome: ${NomeDoAlvo}`)
if (!NomeDoAlvo) return reply(`exemplo: ${prefix+command} JADSON CLAUDIO MARTINS DE SOUZA`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/nome?query=${NomeDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfName = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfName}, {quoted: info})
} catch(err) {
console.log(err)
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/nome?query=${NomeDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfName = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfName}, {quoted: info})
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'telefone':
case 'tell':
case 'tel':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
NumeroDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o telefone: ${NumeroDoAlvo}`)
if (!NumeroDoAlvo) return reply(`exemplo: ${prefix+command} JADSON CLAUDIO MARTINS DE SOUZA`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/tell?query=${NumeroDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfNumero = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfNumero}, {quoted: info})
} catch(err) {
console.log(err)
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/tell2?query=${NumeroDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfNumero = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfNumero}, {quoted: info})
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'placa':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
PlacaDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando a placa: ${PlacaDoAlvo}`)
if (!PlacaDoAlvo) return reply(`exemplo: ${prefix+command} NND1379`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/detran/placa?query=${PlacaDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfPlaca = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfPlaca}, {quoted: info})
} catch(err) {
console.log(err)
getResultsOfApi = await fetchJson(`https://ifenix-api.tk/detran/placa2?query=${PlacaDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
DadosOfPlaca = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfPlaca}, {quoted: info})
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cnpj':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
CnpjDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('/').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cnpj: ${CnpjDoAlvo}`)
if (!CnpjDoAlvo) return reply(`exemplo: ${prefix+command} 27.865.757/0001-02`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cnpj?query=${CnpjDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfCnpj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCnpj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CNPJ NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'cnpj2':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
CnpjDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('/').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando o cnpj: ${CnpjDoAlvo}`)
if (!CnpjDoAlvo) return reply(`exemplo: ${prefix+command} 27.865.757/0001-02`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/cnpj2?query=${CnpjDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfCnpj = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfCnpj}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ CNPJ NÃO ENCONTRADO / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'bin':
if (!isGroup) return reply(`as consultas estao disponiveis apenas para grupos!

Entre No Grupo Do Bot Para Usar:
https://chat.whatsapp.com/KkVjOHpv9vWDCOyc5VZWVV`)
reply(`Aguarde ${pushname}, estou a procurar os dados do alvo em meu banco de dados...\n\nSe Demorar Mais De 1 Minuto Significa Que o Bot Nao Encontrou os Dados No Banco De Dados...`)
BinDoAlvo = args.join(" ")
.split('+').join('')
.split('-').join('')
.split(' ').join('')
.split('/').join('')
.split('.').join('')
.split('(').join('')
.split(')').join('');
console.log(`~> Consultando a bin: ${BinDoAlvo}`)
if (!BinDoAlvo) return reply(`exemplo: ${prefix+command} 498408`)
infoOfUser = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/consultas.json`))
if (infoOfUser.system == "online") {
try {
let getResultsOfApi = await fetchJson(`https://ifenix-api.tk/bin?query=${BinDoAlvo}&token=ifenix_trial_bylzmods`)
imageCS = await getBuffer(fotoconsultas)
let DadosOfBin = `
${getResultsOfApi.resultado.dados}

> Usuario: ${pushname}

${NomeDoBot}
`
lz.sendMessage(from, {image: imageCS, caption: DadosOfBin}, {quoted: info})
} catch(err) {
console.log(err)
reply(`⚠️ BIN NÃO ENCONTRADA / INVALIDO!`)
}
} else {
reply(`CONSULTAS OFFLINE
Motivo: ${infoOfUser.motivo}

${NomeDoBot}
`)
}
break

case 'menu':
reply(infotxt)
break

case 'donodobot':
case 'dono':
SendButtonIMG(from, fotododono, infodono(prefix, NomeDoDono, NumeroDoDono, NomeDoBot), NomeDoBot, [
{buttonId: `${prefix}menu`, buttonText: {displayText: `🌠 Menu De Comandos 🌠`}, type: 1}], info)
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
case 's2':
case 'sticker2':
try {
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, "image")
fs.writeFileSync('./lzmods.webp', buff)
site = fs.readFileSync('./lzmods.webp')
bass64 = `data:image/jpeg;base64,${site.toString('base64')}`
mantap = await convertSticker(bass64, "By LZ", `📍 Figurinha Criada Por ${NomeDoBot}`)
imageBuffer = new Buffer.from(mantap, 'base64');
lz.sendMessage(from, {sticker: imageBuffer}, {quoted: info})
fs.unlinkSync('./lzmods.webp')
} catch {
reply("error 404")
}
break

case 's':
case 'sticker':
case 'figurinha':
case 'figu':
reply(enviar.espere)
try {
if ((isMedia && !info.message.videoMessage || isQuotedImage) && args.length == 0) {
ImagemMarcada = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, "image")
rane = getRandom('.'+await getExtension(ImagemMarcada.mimetype))
fs.writeFileSync(rane, ImagemMarcada)
const media = rn
rano = getRandom('.webp')
exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(media)
buffer = fs.readFileSync(rano)
lz.sendMessage(from, {sticker: buffer}, {quoted: info})
fs.unlinkSync(rano)
})
} else if ((isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 10) && args.length == 0) {
const buff = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(buff.mimetype))
buffimg = await getFileBuffer(buff, 'video')
fs.writeFileSync(rane, buffimg)
const media = rane
rano = getRandom('.webp')
 exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(media)
buffer = fs.readFileSync(rano)
lz.sendMessage(from, {sticker: buffer}, {quoted: info})
fs.unlinkSync(rano)
 })
} else {
reply("apenas videos com no maximo 10 segundos sao suportados.")
}
} catch(e) {
console.log(e)
reply('error 404')
}
break

case 'attp':
sticker = args.join(' ')
if(!sticker) return reply(`*❗ Modo Certo: ${prefix + comando} Infinity Bot ❗*`)
reply(enviar.espere)
url = encodeURI(`https://api.xteam.xyz/attp?file&text=${q}`)
attp = await getBuffer(url)
lz.sendMessage(from, {sticker: attp}, {quoted: doc})
break

case "toimg":
if (!isQuotedSticker) return reply("࿐ Marca uma fig ")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "image")
reply(enviar.espere)
try {
lz.sendMessage(from, {image: buff}, {quoted: live})
} catch(e) {
console.log(e)
reply(enviar.erro)
}
break

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

case 'nomegp':
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
getname = args.join(" ")
nomedogrupo = groupName
let anotar_no_json = {nomedogrupo}
fs.writeFileSync(`./~ iFenixDatab ~/funçoes/temp/dados_group-${from}.json`, JSON.stringify(anotar_no_json))
lz.groupUpdateSubject(from, `${getname}`)
const botoess = [{buttonId: `${prefix}reverse_namegp`, buttonText: {displayText: '💥 Voltar Pro Nome Antigo 💥'}, type: 1}]
const dadoskkk = {
text: "Nome Do Grupo Alterado Com Sucesso",
footer: NomeDoBot,
buttons: botoess,
headerType: 1}
await lz.sendMessage(from, dadoskkk)
break

case 'reverse_namegp':
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
let acett = JSON.parse(fs.readFileSync(`./~ iFenixDatab ~/funçoes/temp/dados_group-${from}.json`))
lz.groupUpdateSubject(from, `${acett.nomedogrupo}`)
fs.unlinkSync(`./~ iFenixDatab ~/funçoes/temp/dados_group-${from}.json`)
break

case 'descgp':
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
getdesc = args.join(" ")
lz.groupUpdateDescription(from, `${getdesc}`)
lz.sendMessage(from, {text: 'Descrição do grupo alterada com sucesso!'}, {quoted: info})
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

case "ping":
reply(`࿐ Velocidade de resposta ${latensi.toFixed(4)} segundos `)
break

case "gplink":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
const link = await lz.groupInviteCode(from)
reply(`࿐ Link do grupo : https://chat.whatsapp.com/${link} `)
break

case "resetarlink":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
try {
await lz.groupRevokeInvite(from)
reply("࿐ Link de convite resetado com sucesso ✓ ")
} catch(e) {
console.log(e)
reply(enviar.erro)
}
break

case "sair":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
reply("ok...me desculpe se eu nao pude ajudá-lo(a) com o que vc precisava....adeus😔")
await delay(1000)
try {
await lz.groupLeave(from)
} catch(e) {
console.log(e)
reply(enviar.erro)
}
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
case "grupo":
if (!isGroup) return reply(enviar.grupo)
if (!groupAdmins) return reply(enviar.adm)
if (!isBotGroupAdmins) return reply(enviar.botadm)
try {
if (q == "a") {
await lz.groupSettingUpdate(from, "not_announcement")
reply("࿐ Grupo aberto com sucesso")
}
if (q == "f") {
await lz.groupSettingUpdate(from, "announcement")
reply("࿐ Grupo fechado com sucesso ")
}
} catch(e) {
console.log(e)
reply(enviar.erro)
}
break

case 'listadm':
if (!isGroup) return reply(enviar.grupo)
teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
no = 0
for (let admon of groupAdmins) {
no += 1
teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
}
mentions(teks, groupAdmins, true)
break

case 'antilink':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('digite 1 para ativar ')
if (Number(args[0]) === 1) {
if (isAntiLink) return reply('o anti-link está ativo')
antilink.push(from)
fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
reply('O anti-link foi ativo no grupo ✔️')
} else if (Number(args[0]) === 0) {
antilink.splice(from, 1)
fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
reply('O anti-link foi desativado com sucesso neste grupo✔️')
} else {
reply('1 para ativar, 0 para desativar ')
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