import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Store name is required"],
            minlength: [20, "Name must be at least 20 characters"],
            maxlength: [60, "Name cannot exceed 60 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address",
            ],
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            maxlength: [400, "Address cannot exceed 400 characters"],
        },

        ratings: [

            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 0, max: 5, default: 0, },
            }

        ],

        averageRating: {
            type: Number,
            default: 0,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    }
)

storeSchema.methods.calculateAverageRating = function () {
    if (this.ratings.length === 0) {
        this.averageRating === 0
    }
    else {
        const total = this.ratings.reduce((sum, item) => sum + item.rating, 0);
        this.averageRating = total / this.ratings.length;
    }
    return this.averageRating
}

const Store = mongoose.model('Store', storeSchema);
export default Store 