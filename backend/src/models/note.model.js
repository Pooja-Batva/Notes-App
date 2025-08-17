import mongoose, { Schema } from "mongoose";

const noteSchema = Schema(
    {
        title : {
            type : String,
        },
        description : {
            type : String,
        },
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
    },
    {
        timestamps : true,
    }
);


export const Note = mongoose.model("Note", noteSchema);