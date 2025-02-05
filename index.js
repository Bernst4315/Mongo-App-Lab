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

app.get("/", async (req,res) => {
    
    const result = await Plant.nv.find();
    const result1 = await Plant.ut.find();
    const result2 = await Plant.wy.find();
    //console.log(Plant.nv)
    res.json({result, result1, result2}).status(200);
})

//Post Requests

app.post("/plants/NV", async (req,res) => {
    const plants = plantdb.plantsNV;
    await Plant.nv.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });
})

app.post("/plants/UT", async (req,res) => {
    const plants = plantdb.plantsUT;
     await Plant.ut.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });
})

app.post("/plants/WY", async (req,res) => {
    const plants = plantdb.plantsWY;
    await Plant.wy.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });

})

//User Input 

app.post("/plants/add/NV", async (req,res) => {
    const plants = req.body;
   await Plant.nv.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });
})

app.post("/plants/add/UT", async (req,res) => {
    const plants = req.body;
    await Plant.ut.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });
})

app.post("/plants/add/WY", async (req,res) => {
    const plants = req.body;
   await Plant.wy.insertMany(plants)
    .then(savedPlants => {res.json(savedPlants).status(200)})
    .catch(err => {
        console.log(err + " Error has occured");
        res.json(err).status(404);
    });
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