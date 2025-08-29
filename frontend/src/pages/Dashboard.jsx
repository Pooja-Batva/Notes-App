import React, { useEffect, useState } from "react";
import { getNotes, deleteNotes } from "../services/noteService";
import Cookies from "js-cookie";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    if (!token) return;

    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNotes(id, token);
        fetchNotes(); // refresh notes after deletion
      } catch (err) {
        alert("Failed to delete note.");
      }
    }
  };

  // Inside Dashboard component
const handleEdit = (id) => {
  // Navigate to AddNote page
  // Pass the note object and a callback to refresh notes
  navigate("/add-note", {
    state: { noteId : id },
  });
};


  const fetchNotes = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("You must be logged in to view notes.");
        setLoading(false);
        return;
      }
      const response = await getNotes(token);
      console.log(response.data);
      setNotes(response.data || []); // assuming API returns { notes: [...] }
    } catch (err) {
      setError("Failed to load notes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // runs once when Dashboard mounts

  if (loading) {
    return <div className="p-6 text-center">Loading your notes...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      {notes.length === 0 ? (
        <p className="text-gray-600">No notes yet. Create your first note!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-700 mt-2">{note.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date(note.updatedAt).toLocaleString()}
              </p>
              {/* Edit & Delete Icons */}
              <div className="flex gap-2 flex-row-reverse">
                <FiEdit
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(note._id)}
                />
                <FiTrash2
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(note._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
