"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "repo", reaction: "🥴", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '𝐓𝐇𝐄 💀𝐃𝐄𝐕𝐈𝐋 😈 𝐉𝐎𝐇𝐍𝐋𝐄𝐎-𝐌𝐃😈 𝐁𝐘 𝐉𝐎𝐇𝐍𝐋𝐄𝐎 𝐓𝐄𝐂𝐇😈  \n\n ' + "𝐅𝐎𝐑𝐊 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎 𝐓𝐎 𝐃𝐄𝐏𝐋𝐎𝐘 𝐘𝐎𝐔𝐑 𝐎𝐖𝐍 𝐁𝐎𝐓 *𝐉𝐎𝐇𝐍𝐋𝐄𝐎-𝐌𝐃 𝐑𝐄𝐏𝐎";
    let d = 'https://github.com/johnleosmith/Johnleo-Md';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/ee73167f14236e3216935.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *FLASH-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *France King*'
      let varmess=z+d
      var img='https://telegra.ph/file/13d63c21c1a665bfd8324.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
