import { MongoClient } from "mongodb"
import "dotenv/config"

const connectStr = process.env.MONGO_URI

const client = new MongoClient(connectStr); 

let conn; 

try{
    conn = await client.connect();
}catch (err) {
    console.log(err)
}

let db = conn.db("plants");

export default db; 