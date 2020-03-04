class DataAccess {
    constructor(couchbaseClient){
        this.couchbaseClient = couchbaseClient;
    }

    add(item){
        return this.couchbaseClient.create(item.id, item);
    }

    getById(id){
        return this.couchbaseClient.getById(id);
    }

    getAll(){
        return this.couchbaseClient.getAll();
    }

    removeById(id){
        return this.couchbaseClient.removeById(id);
    }
}

module.exports = DataAccess;