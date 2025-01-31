import express from "express";
import { MongoClient, ObjectId } from "mongodb"
import mongoose from "mongoose"; 
import "dotenv/config";
import db from "./plantsDb.mjs"

const app = express();
const port = 3000; 
const connectStr = process.env.MONGO_URI
const plants = [{plant_code: "YUBR", sci_name: "yucca brevifolia"}];

//const client = new MongoClient(connectStr); 
mongoose.connect(connectStr);

app.use(express.json()); 

app.listen(port, () => {
    console.log("server is running")
})

app.get("/", (req,res) => {
    res.send("Server On")
})

app.post("/plants", async (req,res) => {
    const collection = await db.collection("NV");
    let newDoc = plants; 

    let results = await collection.insertOne(newDoc[0]);

    res.json(results).status(200);
})

app.delete("/plants/:id", async (req,res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const collection = await db.collection("NV");
    let result = await collection.findOneAndDelete(query);
    res.send(result).status(200);
})

app.get("/plants/NV", async (req,res) => {
    const collection = await db.collection("NV");
    let results = await collection.find().toArray();

    res.send(results).status(200);
})