const env = require('../../../../env.config');

const daos = {
    file: {
        ProductsDao: require('./products/products.file.dao'),
        MessagesDao: require('./messages/messages.file.dao'),
        UsersDao: require('./users/users.file.dao')
    },
    memory: {
        ProductsDao: require('./products/products.memory.dao'),
        MessagesDao: require('./messages/messages.memory.dao'),
        UsersDao: require('./users/users.memory.dao')
    },
    firebase: {
        ProductsDao: require('./products/products.firebase.dao'),
        MessagesDao: require('./messages/messages.firebase.dao'),
        UsersDao: require('./users/users.firebase.dao')
    },
    mongo: {
        ProductsDao: require('./products/products.mongo.dao'),
        MessagesDao: require('./messages/messages.mongo.dao'),
        UsersDao: require('./users/users.mongo.dao')
    }
}

module.exports = daos[env.PERSISTENCE];