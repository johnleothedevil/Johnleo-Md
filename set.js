const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUV6ZjQ5VTBJdGRMKzdiQlZqcFRzQndxRmEyTGFQZ1kxS2QyN2pvcVlXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjFqNzhJWExIT3NNb2NBaE9yWERVSk1TVFNSeFhhcXJDa0l3Z2VNdU8yWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTUtQZ2dqdXNQbS9Ua1oyNmFYUGY0ZE4wNU1tczdpMGMwMmUrc3kyN0hRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyWC9nWENrdmRKQmR2YXJxV2F0MTJ1VXFQU1BzSHdYNVhkbGt4QzJKVlJzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1Mczk0M2VCVXNBYTRTdVJlUVpuQWkyVmI3THFKVURaYVB5TmthTml0RkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZoRVVlc0plZmZrTGhqNVE0T0Z0MGpjY2hqVmhlamRwNm9CUndxckRHa2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0dUOVdyZWpBSVNxckNrQWxaa1hNajdIR0Z0NTVXV1o2Q3dSWlZuRHFVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05kYjJYbm5BNmZJUWJ3Zm9HbDZzcmxMR1A5SG1oeGNWUjlLOUVqcXlYOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhkT1U2djZzcjNqVTUrMHFQRXBUdzRlUStONGc3QlZnd3NsZklQK2gwZlhMcFJZRThqT3lPMHQxU1JjSUtHVEZMRW5rN2NKbGFNK3cxZ3kzaDlrakNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJGa0U3TVk4Tld3Tm50RW5hbkhHU0NjSU9LVFhnZDFWaDdCSmZ2c2VSSGxzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzbGZ2TEoycVMwdWZIT1ZyVmtLNFl3IiwicGhvbmVJZCI6IjNkMTk3NTU3LTY3M2ItNDM3NC1hYzZjLWJlOTJmNWUzY2YwYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHQzd6YzFlcDdCUWc5WVFKN3BaRStZSmtpaTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXB0MkFmYy9reUFaM2ZCSlRhQjB6b3FKZDd3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJUUVAzOVExIiwibWUiOnsiaWQiOiIyNjM3MTgwMzYxMDg6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTi5PLlAgTUFHRUVaIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNRyt3SkFGRVAzLzNiWUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtSTd6UFIrQXVXaURNVmkvZWFFQmxhTDZiYURQUlpxS3BaSHVMWFVQS1VRPSIsImFjY291bnRTaWduYXR1cmUiOiJmeHIzN1h1M0lHbFNRWUFiWGo1NlRrS0FuWEJ3UEpuQjdHSmFyZFhuMnY4MGlpZlhiYjV5ZTc2NFlYaVY0WExTNU1ibTI2eVpYRU1qUFJrandzSkpEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSldrSUpmWDl2VXFHdHI3YkhBY1o0OXBJbllPZ2ZNcWsvbWZhaU14ajYrNzBuU1ZESzFycmFZaVFVTGFSbFdkOUdndUU5Z3dHVW16ckQ0YTI1VHBMRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTgwMzYxMDg6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmlPOHowZmdMbG9nekZZdjNtaEFaV2krbTJnejBXYWlxV1I3aTExRHlsRSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTM5OTA1MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLVEwifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Johnleo Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Johnleo Tech",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Johnleo-Md',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/ee73167f14236e3216935.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

