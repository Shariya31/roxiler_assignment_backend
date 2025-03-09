import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 60
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
            maxlength: 400
        },
        role: {
            type: String,
            default: 'user',
            enum: ['admin', 'user', 'store_owner']
        },

        stores: [
            {
                store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },

            }
        ],
        resetPasswordToken: String,
        resetPasswordExpire: Date
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', userSchema);
export default User;