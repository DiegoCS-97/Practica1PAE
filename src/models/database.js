const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

let db;
let isConnecting;

dotenv.config();

const mongoUrl = process.env.MONGO_URL;


class Database {
    collectionName;

    constructor() {
        if(isConnecting) return;

        isConnecting = true;

        MongoClient.connect(mongoUrl, { useUnifiedTopology:true }, (err, client) => {
            if(err) {
                console.log('Failed to conenct to MongoDB');
                return;
            }
        
            db = client.db();
            console.log('Successfully connected to MongoDB');
        });

        setTimeout(() => {
            console.log('Database connection time out');
        }, 2000);
    }

    useCollection(name){
        this.collectionName = name;
    }

    find(filters, cb){
        const collection = db.collection(this.collectionName);
        return collection.find(filters).toArray(cb);
    }

    insert(cb){
        const collection = db.collection(this.collectionName);
        return collection.insertOne(cb);
    }

}

module.exports = Database;