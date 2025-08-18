import {Router} from "express";
import {verifyJWT} from "../middlewares/index.js"
import { addNote, deleteNote, notes, upadateNote } from "../controllers/index.js";

const noteRouter = Router();

noteRouter.route("/").get(verifyJWT, notes);
noteRouter.route("/add").post(verifyJWT, addNote);
noteRouter.route("/update/:id").patch(verifyJWT, upadateNote);
noteRouter.route("/delete/:id").delete(verifyJWT, deleteNote);

export default noteRouter;