class Container{
    constructor(config, table){
        this.connection = require('knex')(config);
        this.table = table;
    }

    read(){
        this.connection.select('*')
            .from(this.table)
    }

    save(object){

    }

    getById(id){

    }

    getAll(){

    }

    deleteById(id){

    }

    deleteAll(){

    }
}

module.exports.Container = Container;