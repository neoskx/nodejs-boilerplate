const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const config = require('../config');

// private variables, to store reference, shouldn't be directed access
let _mongoDBURL;
let _db;
let _client;

if (!config.MONGODB_USERNAME || !config.MONGODB_PASSWORD) {
    _mongoDBURL = `mongodb://${config.MONGODB_URL}`;
} else {
    _mongoDBURL = `mongodb://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_URL}`;
}

// TODO: need to think about support multiple database
async function DB() {
    if (_db) {
        return _db;
    }
    _client = new MongoClient(_mongoDBURL);
    return new Promise((resolve, reject) => {
        _client.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                _db = _client.db(config.MONGODB_NAME);
                resolve(_db);
            }
        });
    });
}

async function find(collectionName, query, options) {
    let db = await DB();
    const collection = db.collection(collectionName);
    let result = await collection.find(query, options||{});
    result = result.toArray();
    return result;
}

async function findOne(collectionName, query, options) {
    let db = await DB();
    const collection = db.collection(collectionName);
    const result = await collection.findOne(query, options||{});
    return result;
}

async function updateOne(collectionName, filter, update, options) {
    let db = await DB();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, update ,options||{});
    return result;
}

async function updateMany(collectionName, filter, update, options) {
    let db = await DB();
    const collection = db.collection(collectionName);
    const result = await collection.updateMany(filter, update ,options||{});
    return result;
}

async function insertOne(doc, collectionName) {
    let db = await DB();
    let collection = db.collection(collectionName);
    if(!doc.create_at){
        doc.create_at = Date.now();
    }
    let result = await collection.insertOne(doc);
    return result;
}

async function findOneById(id, collectionName, options) {
    let db = await DB();
    const collection = db.collection(collectionName);
    const result = await collection.findOne({
        _id: {
            $eq: id
        }
    }, options||{});
    return result;
}

async function findOneByGlobalId(id, collectionName, options) {
  let db = await DB();
  const collection = db.collection(collectionName);
  const result = await collection.findOne({
    global_id: {
      $eq: id
    }
  }, options||{});
  return result;
}

async function checkExistByID(id, collectionName){
    const result = await findOneById(id, collectionName, {'_id': 1});
    return !!result;
}

async function updateOneById(id, data, collectionName, upsert) {
    let db = await DB();
    const collection = db.collection(collectionName);
    if(!data.modified_at){
        data.modified_at = Date.now();
    }

    let result = await collection.updateOne({
        _id: {
            $eq: id
        }
    }, {
        $set: data
    }, {
        upsert: upsert
    });
    return result;
}

async function updateOneByGlobalId(gid, data, collectionName, upsert) {
    let db = await DB();
    const collection = db.collection(collectionName);
    if(!data.modified_at){
        data.modified_at = Date.now();
    }

    let result = await collection.updateOne({
        global_id: {
            $eq: gid
        }
    }, {
        $set: data
    }, {
        upsert: upsert
    });
    return result;
}

module.exports = {
    DB,
    find,
    findOne,
    insertOne,
    updateOne,
    updateMany,
    findOneById,
    updateOneById,
    updateOneByGlobalId
}