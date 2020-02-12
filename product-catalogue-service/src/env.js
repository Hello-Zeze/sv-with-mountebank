class Environment {    
    static canRun(){

        if(process.env.COUCHBASE_HOST === undefined){
            console.error('COUCHBASE_HOST not set.');
            return false;
        }

        if(process.env.COUCHBASE_CLUSTER_USERNAME === undefined){
            console.error('COUCHBASE_CLUSTER_USERNAME not set.');
            return false;
        }

        if(process.env.COUCHBASE_CLUSTER_PASSWORD === undefined){
            console.error('COUCHBASE_CLUSTER_PASSWORD not set.');
            return false;
        }

        if(process.env.COUCHBASE_PRODUCTS_BUCKET === undefined){
            console.error('COUCHBASE_PRODUCTS_BUCKET not set.');
            return false;
        }

        if(process.env.ALLOWED_ORIGINS === undefined){
            console.error('ALLOWED_ORIGINS not set.');
            return false;
        }

        console.log(`Used Configuration:`);        
        console.log(`COUCHBASE_HOST: ${process.env.COUCHBASE_HOST}`);
        console.log(`COUCHBASE_CLUSTER_USERNAME: ${process.env.COUCHBASE_CLUSTER_USERNAME}`);
        console.log(`COUCHBASE_CLUSTER_PASSWORD: ${process.env.COUCHBASE_CLUSTER_PASSWORD}`);
        console.log(`COUCHBASE_PRODUCTS_BUCKET: ${process.env.COUCHBASE_PRODUCTS_BUCKET}`);
        console.log(`ALLOWED_ORIGINS: ${process.env.ALLOWED_ORIGINS}`);

        return true;
    }
}

module.exports = Environment;
