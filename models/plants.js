import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    plant_code: {
        type: String,
        required: true, 
    },

    sci_name: {
        type: String,
        required: true, 
    },

    common_name: {
        type: String,
        required: false, 
    },

    notes: {
        type: String,
        required: false, 
    },

    state_habitat: {
        type: String,
        required: true, 
    }

})

export default {
    nv: mongoose.model("plant", plantSchema, "plantsNV"), 
    ut: mongoose.model("plant", plantSchema, "plantsUT"),
    wy: mongoose.model("plant", plantSchema, "plantsWY")
}

