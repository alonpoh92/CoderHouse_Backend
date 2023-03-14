const env = require('../../../../env.config');

const containers = {
    file: require('./file/file.container'),
    memory:require('./memory/memory.container'),
    firebase:require('./firebase/firebase.container'),
    mongo: require('./mongoDB/mongodb.container'),
}

module.exports = containers[env.PERSISTENCE];