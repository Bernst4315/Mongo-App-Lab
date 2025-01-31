import express from "express";
import { MongoClient, ObjectId } from "mongodb"
import mongoose from "mongoose"; 
import "dotenv/config";
import db from "./plantsDb.mjs"
import Plant from "./models/plants.js"

const app = express();
const port = 3000; 
const connectStr = process.env.MONGO_URI
const plants = [{plant_code: "YUBR", sci_name: "yucca brevifolia", state_habitat: "NV"}];

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
    const plant = new Plant ({
        plant_code: "YUBR",
        sci_name: "yucca brevifolia",
        state_habitat: "NV"
    })
 
    await plant.save();

    res.json(plant).status(200);
})



app.get("/plants", async (req,res) => {
  const plant = await Plant.find();
  res.json(plant).status(200);
})

app.delete("/plants/:id", async (req,res) => {
    await Plant.findByIdAndDelete(req.params.id);  
    res.json("plant removed").status(200)
})

app.patch("/plants/:id", async (req,res) => {
    await Plant.findByIdAndUpdate(req.params.id, req.body);  
    res.json("plant updated").status(200)
})