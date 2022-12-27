const minimist = require('minimist');

module.exports = minimist(process.argv.slice(2), {
    alias: {
        p: 'port'
    },
    default: {
        port: 8080
    }
});