require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SERVER_MODE: process.env.SERVER_MODE,
    PERSISTENCE: process.env.PERSISTENCE,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    FB_TYPE: process.env.FB_TYPE.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_POJECT_ID: process.env.FB_POJECT_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_PRIVATE_KEY_ID: process.env.FB_PRIVATE_KEY_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_ID: process.env.FB_CLIENT_ID.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_AUTH_URI: process.env.FB_AUTH_URI.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_TOKEN_URI: process.env.FB_TOKEN_URI.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_AUTH_PROVIDER_X509_CERT_URL: process.env.FB_AUTH_PROVIDER_X509_CERT_URL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    FB_CLIENT_X509_CERT_URL: process.env.FB_CLIENT_X509_CERT_URL.replace(/\\n/g, '\n').replace("'","").replace('"',""),
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    SESSION_DATABASE: process.env.SESSION_DATABASE,
    COOKIE_NAME: process.env.COOKIE_NAME,
    SESSION_TIME_EXP: process.env.SESSION_TIME_EXP
}