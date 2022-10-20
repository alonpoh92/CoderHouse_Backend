class Container{
    constructor(config, table){
        this.connection = require('knex')(config);
        this.table = table;
    }

    async save(object){
        const res = {};
        try{
            const ret = await this.connection(this.table).insert(object);
            res['data'] = ret[0];
            res['error'] = null;
        }catch{
            res['data'] = null;
            res['error'] = error;
        }
        console.log("save", res);
        return res;
    }

    async getById(id){
        const res = {};
        try{
            const rows = await this.connection.from(this.table).select("*").where('id', '=', id);
            if(rows.length > 0){
                res['data'] = rows[0];
                res['error'] = null;
            }else{
                res['data'] = null;
                res['error'] = `Id ${id} has not been found`;
            }
        }catch{
            res['data'] = null;
            res['error'] = error;
        }
        console.log("getById", res);
        return res;
    }

    async getAll(){
        const res = {};
        try{
            const rows = await this.connection.from(this.table).select("*");
            res['data'] = rows;
            res['error'] = null;
        }catch{
            res['data'] = null;
            res['error'] = error;
        }
        console.log("getAll", res);
        return res;
    }

    async deleteById(id){
        const res = {};
        try{
            await this.connection.from(this.table).where('id', id).del();
            res['error'] = null;
        }catch{
            res['error'] = error;
        }
        console.log("deleteById", res)
        return res;
    }

    async deleteAll(){
        const res = {};
        try{
            await this.connection.from(this.table).del();
            res['error'] = null;
        }catch{
            res['error'] = error;
        }
        console.log("deleteAll", res)
        return res;
    }
}

module.exports.Container = Container;