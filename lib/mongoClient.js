import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.mongoUri;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

if (!uri) throw new Error('Please Add Mongo Uri to the env file');

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = mongoClient.db('food-buzz');
export const userCollection = db.collection('users');
export const orderCollection = db.collection('orders');
