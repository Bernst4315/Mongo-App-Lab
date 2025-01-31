import express from "express";
import { MongoClient, ObjectId } from "mongodb"
import mongoose from "mongoose"; 
import "dotenv/config";
import db from "./plantsDb.mjs"
import Plant from "./models/plants.js"

const app = express();
const port = 3000; 
const connectStr = process.env.MONGO_URI
const plantsNV = [
    {
        plant_code: "YUBR", 
        sci_name: "yucca brevifolia",
        common_name: "Joshua Tree",
        notes: "Distinct plant unique to the Mojave Desert",
        state_habitat: "NV"
    },
    {
        plant_code: "OPPO", 
        sci_name: "opuntia polyacantha",
        common_name: "pricklypear cactus",
        notes: "common desert plant",
        state_habitat: "NV"
    },
    {
        plant_code: "LATR2", 
        sci_name: "Larrea tridentata",
        common_name: "Creosote",
        notes: "Bush that smells like a campfire after it rains",
        state_habitat: "NV",
    },
    {
        plant_code: "OPBA2", 
        sci_name: "Opuntia basilaris",
        common_name: "beavertail cactus",
        notes: "has hairs like fiberglass instead of spines",
        state_habitat: "NV",
    },
    {
        plant_code: "CYBI9", 
        sci_name: "cylindropuntia bigelovii",
        common_name: "teddybear cholla",
        notes: "DO NOT HUG!!! a mean plant!",
        state_habitat: "NV",
    },
];

const plantsUT = [
    {
        plant_code: "PIED", 
        sci_name: "Pinus edulis",
        common_name: "twoneedle pinyon",
        notes: "typically found with Juniper",
        state_habitat: "UT",
    },
    {
        plant_code: "JUOS", 
        sci_name: "juniperus osteosperma",
        common_name: "Utah juniper",
        notes: "Found in higher elevations, typically with pinyons",
        state_habitat: "UT",
    },
    {
        plant_code: "ACHY", 
        sci_name: "Achnatherum hymenoides",
        common_name: "indian ricegrass",
        notes: "likes to grown in clumps. Found in sandy soils",
        state_habitat: "UT",
    },
    {
        plant_code: "KOMA", 
        sci_name: "Koeleria macrantha",
        common_name: "prairie Junegrass",
        notes: "grows in clumps with dense seedheads",
        state_habitat: "UT",
    },
    {
        plant_code: "BRTE", 
        sci_name: "Bromus tectorum",
        common_name: "cheatgrass",
        notes: "invasive species",
        state_habitat: "UT",
    },
]

const plantsWY = [
    {
        plant_code: "ARTRW8", 
        sci_name: "Artemisia tridentata ssp. wyomingensis",
        common_name: "Wyoming bigsage brush",
        notes: "Ubiquitous on the plains of WY",
        state_habitat: "WY",
    },
    {
        plant_code: "XYGL", 
        sci_name: "Xylorhiza glabriuscula",
        common_name: "smooth woody aster",
        notes: "has woody tissue at the base of stems",
        state_habitat: "WY",
    },
    {
        plant_code: "ARTRV", 
        sci_name: "Artemisia tridentata ssp. vaseyana",
        common_name: "mountain bigsage brush",
        notes: "When leaves soaked in water, will fluoresce under a black light. This is the only way to tell it apart from Artemsia tridentata ssp. wyomingensis.",
        state_habitat: "WY",
    },
    {
        plant_code: "CORA5", 
        sci_name: "Cordylanthus ramosus",
        common_name: "bushy bird's beak",
        notes: "flowers looks like a birds beak",
        state_habitat: "WY",
    },
    {
        plant_code: "COUM", 
        sci_name: "Comandra umbellata",
        common_name: "bastard toadflax",
        notes: "When top layer of root is scratched off, the underlying tissue turns blue",
        state_habitat: "WY",
    },
]
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
    
    // const plant = [];
    
    // plants.forEach((p) => {
    //     p = new Plant.p1 (p);
    //     plant.push(p)

    // })
    
    const plants = plantsNV;
    const savedPlants = await Plant.p1.insertMany(plants);

    res.json(savedPlants).status(200);
    
    // const plant = new Plant.p1 (
    //  plantsNV[0], plantsNV[1]
    // )
 
    // await plant.save();

    //  res.json(plant).status(200);
})

app.post("/plants/UT", async (req,res) => {
    const plant = new Plant.p2 ({
        plant_code: "YUBR",
        sci_name: "yucca brevifolia",
        state_habitat: "UT"
    })
 
    await plant.save();

    res.json(plant).status(200);
})

app.post("/plants/WY", async (req,res) => {
    const plant = new Plant.p3 ({
        plant_code: "YUBR",
        sci_name: "yucca brevifolia",
        state_habitat: "WY"
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