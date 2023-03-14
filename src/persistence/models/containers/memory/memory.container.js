const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const env = require('../../../../../env.config');
const dbConfig = require('../../../db/db.config');

class MemoryContainer {
  
    constructor() {
        this.model = [];
    }

    static async connect() {
        return
    }

    getAll() {
        return this.model;
    }

    getById(id) {
        const document = this.model.filter(item => item.id == id);
        if (!(document.length > 0)) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return document[0];
    }

    getByEmail(email) {
        const document = this.model.filter(item => item.email == email);
        if (!(document.length > 0)) {
            const message = `Resource with email ${email} does not exist in our records`;
            throw new Error(message);
        }
        return document;
    }

    save(object) {
        const data = this.getAll();
        let maxId = 0;
        if(data.length > 0){
            const ids = data.map(item => item.id);
            maxId = Math.max(...ids);
        }
        object.id = maxId + 1;
        this.model.push(object);
        return object;
    }

    update(id, item) {
        this.model.map(oldItem => {
            if(oldItem.id == id){
                oldItem = item;
            }
        });

        return item;
    }

    delete(id) {
        const newItems = this.model.filter(item => item.id != id);
        this.model = newItems;
        return this.model;
    }
}

module.exports = MemoryContainer;