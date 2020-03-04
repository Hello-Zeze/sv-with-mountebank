const couchbase = require('couchbase');

class CouchbaseClient {
    constructor(couchConfig){
        this.cluster = new couchbase.Cluster(`couchbase://${couchConfig.couchbaseHost}/`);
        this.cluster.authenticate(couchConfig.couchbaseClusterUsername, couchConfig.couchbaseClusterPwd);
        this.bucketConfiguration = {
          label: couchConfig.couchbaseBucketLabel,
          fieldNames: couchConfig.couchIndexData.fields
        };
        this.configureBucketIndex(couchConfig.couchIndexData.fields);
    }

    configureBucketIndex(indexFieldCollection){
      return new Promise((resolve,reject)=>{
        const bucket = this.cluster.openBucket(this.bucketConfiguration.label);
        const indexName = `IDX_${this.bucketConfiguration.label}`;
        bucket.manager().createIndex(indexName, indexFieldCollection, { deferred:false, ignoreIfExists: true }, function(err){
          if(err)
            reject(`Error creating index: ${indexName}`);
          else
            resolve(`Index '${indexName}' created successfully.`);
        });
      });      
    }

    create(documentId, documentData){
      return new Promise((resolve,reject)=>{
        const bucket = this.cluster.openBucket(this.bucketConfiguration.label);
        bucket.insert(documentId, documentData, function(err,result){
          if(err){
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
    
    update(documentId, documentData){
      return new Promise((resolve,reject)=>{
        const bucket = this.cluster.openBucket(this.bucketConfiguration.label);
        bucket.upsert(documentId, documentData, function(err,result){
          if(err){
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    getById(documentId){
      return new Promise((resolve,reject)=>{
        const bucket = this.cluster.openBucket(this.bucketConfiguration.label);
        bucket.get(documentId, function(err, result){
          if(err){
            reject(err);
          } else {
            resolve(result.value);
          }
        });
      });
    }

    query(searchQueryClause){
      return new Promise((resolve,reject)=>{
        const bucketLabel = this.bucketConfiguration.label;
        const bucket = this.cluster.openBucket(bucketLabel);
        const query = couchbase.N1qlQuery;
        if(searchQueryClause.length === 0){
          reject('Cannot perform search with empty search parameters.');
        } else {
          bucket.manager().createPrimaryIndex({ ignoreIfExists: true }, function(err){
            if(err){
              reject(err);
            } else {
              bucket.query(query.fromString(`SELECT * FROM ${bucketLabel} WHERE ${searchQueryClause}`), function(qerr, rows){
                if(qerr){
                  reject(qerr);
                }else{
                  const results = rows.map(item=>{return item[bucketLabel];});
                  resolve(results);
                }
              });
            }            
          });          
        }        
      });
    }

    getAll(){
      return new Promise((resolve,reject)=>{
        const bucketLabel = this.bucketConfiguration.label;
        const bucket = this.cluster.openBucket(bucketLabel);
        bucket.manager().createPrimaryIndex({ ignoreIfExists: true }, function(err){
          if(err){
            reject(err);
          } else {
            const query = couchbase.N1qlQuery;
            bucket.query(query.fromString(`SELECT * FROM ${bucketLabel}`), function(qerr, rows){

              if(qerr){
                reject(qerr);
              }else{
                const results = rows.map(item=>{
                  return item[bucketLabel];
                });
                resolve(results);
              }
            });
          }          
        });
      });
    }

    removeById(documentId){
      return new Promise((resolve,reject)=>{
        const bucket = this.cluster.openBucket(this.bucketConfiguration.label);
        bucket.remove(documentId, function(err, result){
          if(err){
            reject(err);
          } else {
            resolve(result.value);
          }
        });
      });
    }
}

module.exports = CouchbaseClient;
