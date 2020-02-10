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

        if(process.env.COUCHBASE_RECOMMENDATIONS_BUCKET === undefined){
            console.error('COUCHBASE_RECOMMENDATIONS_BUCKET not set.');
            return false;
        }

        console.log(`Used Configuration:`);        
        console.log(`COUCHBASE_HOST: ${process.env.COUCHBASE_HOST}`);
        console.log(`COUCHBASE_CLUSTER_USERNAME: ${process.env.COUCHBASE_CLUSTER_USERNAME}`);
        console.log(`COUCHBASE_CLUSTER_PASSWORD: ${process.env.COUCHBASE_CLUSTER_PASSWORD}`);
        console.log(`COUCHBASE_RECOMMENDATIONS_BUCKET: ${process.env.COUCHBASE_RECOMMENDATIONS_BUCKET}`);

        return true;
    }
}

module.exports = Environment;