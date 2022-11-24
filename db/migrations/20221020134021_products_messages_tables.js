const dbConfig = require('../config');
const knex = require('knex');
const mariaDBconnection = knex(dbConfig.mariaDB);
const SQLiteconnection = knex(dbConfig.sqlite);

module.exports.up = async function() {
    let exist = await mariaDBconnection.schema.hasTable('products');
    if(!exist){
        return mariaDBconnection.schema.createTable('products', (table) => {
            table.increments('id');
            table.string('title').notNullable();
            table.string('thumbnail').notNullable();
            table.double('price').notNullable();
        });
    }
    exist = await SQLiteconnection.schema.hasTable('messages');
    if(!exist){
        return SQLiteconnection.schema.createTable('messages', (table) => {
            table.
            table.increments('id');
            table.string('email').notNullable();
            table.string('message').notNullable();
            t
            table.dat('date').notNullable();
        });
    }
};

module.exports.down = async function() {
    let exist = await knex.schema.hasTable('products');
    if(exist){
        return knex.schema.dropTable('products');
    }
    exist = await knex.schema.hasTable('messages');
    if(exist){
        return knex.schema.dropTable('messages');
    }
};
