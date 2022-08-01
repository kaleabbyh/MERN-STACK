import axios from "axios";

const API_URL = "http://localhost:5000/api/notes/";

// Create new goal
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

// Get user goals
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user goal
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteId, config);

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  deleteNote,
};

export default noteService;
