import { Mongo } from 'meteor/mongo';
import { Snowflake } from 'node-snowflake';

class Model {
    constructor(name) {
        this._collection = new Mongo.Collection(name);
    }
    
    get length() {
        return this._collection.find({}).count();
    }
    
    getAll(opts = {}) {
        return this._collection.find({}, opts).fetch();
    }
    
    deleteItem(id) {
        this._collection.remove(id);
    }
    
    get(id) {
        return this._collection.findOne(id);
    }
    
    filter(params) {
        return this._collection.find(params).fetch();
    }
    
    insert(data) {
        const created = new Date();
        data.createdAt = created;
        data._id = Snowflake.nextId();
        this._collection.insert(data);
    }
}

export default Model;