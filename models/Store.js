import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        address: { 
            type: String, 
            required: true 
        },
        owner: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
    }
)

const Store = mongoose.model('Store', storeSchema);
export default Store 