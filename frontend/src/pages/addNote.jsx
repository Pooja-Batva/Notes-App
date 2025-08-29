import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createNote, getNotes, updateNotes } from "../services/noteService";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const noteId = location.state?.noteId || null;

  useEffect(() => {
    const fetchNote = async () => {
      if (noteId) {
        try {
          const token = Cookies.get("token");
          const response = await getNotes(token); // fetch all notes
          const note = response.data.find((n) => n._id === noteId);
          if (note) {
            setTitle(note.title);
            setDescription(note.description);
          }
        } catch (err) {
          console.error("Failed to fetch note:", err);
        }
      }
    };
    fetchNote();
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = Cookies.get("token");
    if (!token) {
      setError("You must be logged in to add a note.");
      return;
    }

    try {
      if (noteId) {
        // Update note
        await updateNotes(noteId, { title, description }, token);
      } else {
        // Create note
        await createNote({ title, description }, token);
      }
      navigate("/");
    } catch (err) {
      setError("Failed to save note.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-lg rounded-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4">
            {noteId ? "Edit Note" : "Add New Note"}
          </h2>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {noteId ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
