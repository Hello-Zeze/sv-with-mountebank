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
}

module.exports = DataAccess;