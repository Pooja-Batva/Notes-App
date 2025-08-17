import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = Schema(
    {
        username : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        password : { //Hashed Password Store
            type : String,
            required : true,
        },
        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
);

//Password Hashed
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// custome methods
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function() {
    const token =  await jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return token;
}
userSchema.methods.generateRefreshToken = async function() {
    const token = await jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    );
    return token;
}


export const User = mongoose.model("User", userSchema);