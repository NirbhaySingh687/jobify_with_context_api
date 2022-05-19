import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { encrypt } from "../middlewares/helper"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "lastName"
    },
    email: {
        type: String,
        required: [true, "Please Provide email"],
        validate: {
            validator: isEmail,
            message: "Please provide a valid email "
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide password"],
        select: false
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "my city"
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return encrypt(jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    }))
}

userSchema.methods.comparePassword = function(candidatePassword){
    return  bcrypt.compare(candidatePassword, this.password)
}


export default mongoose.model("user", userSchema)