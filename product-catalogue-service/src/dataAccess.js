class DataAccess {
    constructor(couchbaseClient){
        this.couchbaseClient = couchbaseClient;
    }

    add(item){
        return this.couchbaseClient.create(item.id, item);
    }

    getAll(){
        return this.couchbaseClient.getAll();
    }

    getById(id){
        return this.couchbaseClient.getById(id);
    }
}

module.exports = DataAccess;