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

    removeById(id){
        return this.couchbaseClient.removeById(id);
    }
}

module.exports = DataAccess;