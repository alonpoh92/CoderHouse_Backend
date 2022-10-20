const dbConfig = require('./db/config');
const knex = require('knex');
const mariaDBconnection = knex(dbConfig.mariaDB);
const SQLiteconnection = knex(dbConfig.sqlite);

async function initTables() {
    let exist = await mariaDBconnection.schema.hasTable('products');
    if(!exist){
        await mariaDBconnection.schema.createTable('products', (table) => {
            table.increments('id');
            table.string('title').notNullable();
            table.string('thumbnail').notNullable();
            table.double('price').notNullable();
        });
    }
    exist = await SQLiteconnection.schema.hasTable('messages');
    if(!exist){
        await SQLiteconnection.schema.createTable('messages', (table) => {
            table.increments('id');
            table.string('email').notNullable();
            table.string('message').notNullable();
            table.date('date').notNullable();
        });
    }
    console.log("Tables Created Successfully");
    return;
};

Promise.all([
    initTables()
]).then(process.exit);