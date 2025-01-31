import express from "express";
import mongoose from "mongoose"; 
import "dotenv/config";

const app = express();
const port = 3000; 

mongoose.connect(process.env.MONGO_URI);

app.use(express.json()); 

app.listen(port, () => {
    console.log("server is running")
})

app.get("/", (req,res) => {
    res.send("Server On")
})