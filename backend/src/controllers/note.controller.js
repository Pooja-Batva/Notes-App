import { Note } from "../models/index.js";
import {ApiError, ApiResponse, asyncHandler} from "../utils/index.js"


const addNote = asyncHandler(async(req, res) => {
    // fetch user input
    const {title, description} = req.body;
    console.log(title, description);

    if(!title){
        throw new ApiError(400, "Title is required.");
    }

    // fetch user
    // console.log(req.user);
    // Note.user = req.user._id;

    // create note with user corresponding id
    const createdNote = await Note.create(
        {
            title,
            description,
            user : req.user._id
        }
    );

    console.log(createdNote);

    // return
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdNote,
            "Note created successfully"
        )
    )
});

const upadateNote = asyncHandler(async(req, res) => {
    // fetch note id
    // console.log("id :",req.params);
    const { id } = req.params;
    const {title, description} = req.body;

    // update content
    const note = await Note.findByIdAndUpdate(
        id,
        {
            $set : {
                title,
                description
            }
        },
        {
            new : true
        }
    );
    console.log(note);

    // return
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            note,
            "Note Updated Successfully"
        )
    )
});

const deleteNote = asyncHandler(async(req, res) => {
    // fetch note id
    const {id} = req.params;

    // delete
    const note = await Note.findByIdAndDelete(id);
    console.log(note);

    // return
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            note,
            "Note deleted Successfully"
        )
    )
});

const notes = asyncHandler(async(req, res) => {
    const id = req.user._id;

    // find all notes that have user : id
    const notes = await Note.find(
        {
            user : id
        }
    );

    console.log(notes);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            notes,
            "fetch all notes successfully"
        )
    )
});


export {
    addNote,
    upadateNote,
    deleteNote,
    notes,
}