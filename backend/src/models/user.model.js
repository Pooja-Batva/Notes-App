import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


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
userSchema.pre("save", function(next){
    if(!this.isModify("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});

// custome methods
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);