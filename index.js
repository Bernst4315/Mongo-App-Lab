import express from "express";
import mongoose from "mongoose"; 
import "dotenv/config";

import Plant from "./models/plants.js";
import plantdb from "./plantDatabase.js";

const app = express();
const port = 3000; 
const connectStr = process.env.MONGO_URI

mongoose.connect(connectStr);

app.use(express.json()); 

app.listen(port, () => {
    console.log("server is running")
})

app.get("/", (req,res) => {
    res.send("Server On")
})

app.get("/plants", async (req,res) => {
  const plant = await Plant.find();
  res.json(plant).status(200);
})

app.get("/test", async (req,res) => {
    
    const result = await Plant.nv.find();
    const result1 = await Plant.ut.find();
    const result2 = await Plant.wy.find();
    //console.log(Plant.nv)
    res.json({result, result1, result2}).status(200);
})

//Post Requests

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


//Edit Requests

app.patch("/plants/NV/:id", async (req,res) => {
    await Plant.nv.findByIdAndUpdate(req.params.id, req.body);  
    res.json("plant updated").status(200)
})

app.patch("/plants/UT/:id", async (req,res) => {
    await Plant.ut.findByIdAndUpdate(req.params.id, req.body);  
    res.json("plant updated").status(200)
})

app.patch("/plants/WY/:id", async (req,res) => {
    await Plant.wy.findByIdAndUpdate(req.params.id, req.body);  
    res.json("plant updated").status(200)
})

//Delete Requests
    
app.delete("/plants/NV/:id", async (req,res) => {
    await Plant.nv.findByIdAndDelete(req.params.id);  
    res.json("plant updated").status(200)
})

app.delete("/plants/UT/:id", async (req,res) => {
    await Plant.ut.findByIdAndDelete(req.params.id);  
    res.json("plant updated").status(200)
})

app.delete("/plants/WY/:id", async (req,res) => {
    await Plant.wy.findByIdAndDelete(req.params.id);  
    res.json("plant updated").status(200)
})