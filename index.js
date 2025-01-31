import express from "express";
import { MongoClient, ObjectId } from "mongodb"
import mongoose from "mongoose"; 
import "dotenv/config";
import db from "./plantsDb.mjs"
import Plant from "./models/plants.js";
import plantdb from "./plantDatabase.js";

const app = express();
const port = 3000; 
const connectStr = process.env.MONGO_URI
//const client = new MongoClient(connectStr); 
mongoose.connect(connectStr);

app.use(express.json()); 

app.listen(port, () => {
    console.log("server is running")
})

app.get("/", (req,res) => {
    res.send("Server On")
})

app.get("/test", (req,res) => {
    console.log(Plant)
    res.json(Plant)
})

app.post("/plants/NV", async (req,res) => {
    
    const plants = plantdb.plantsNV;
    const savedPlants = await Plant.nv.insertMany(plants);

    res.json(savedPlants).status(200);

})

app.post("/plants/UT", async (req,res) => {
    const plants = plantdb.plantsUT;
    const savedPlants = await Plant.ut.insertMany(plants);

    res.json(savedPlants).status(200);
})

app.post("/plants/WY", async (req,res) => {
    const plants = plantdb.plantsWY;
    const savedPlants = await Plant.wy.insertMany(plants);

    res.json(savedPlants).status(200);;
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