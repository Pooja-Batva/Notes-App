import api from './api'

const NOTE_API = "notes";

export const createNote = (data, token) => api.post(`${NOTE_API}/add`, data, {
    headers: {Authorization : `Bearer ${token}`}
});
export const getNotes = (token) => api.get(`${NOTE_API}/`, {
    headers: {Authorization : `Bearer ${token}`}
});
export const updateNotes = (id, data, token) => api.patch(`${NOTE_API}/update/${id}`, data, {
    headers: {Authorization : `Bearer ${token}`}
});
export const deleteNotes = (id, token) => api.delete(`${NOTE_API}/delete/${id}`, {
    headers: {Authorization : `Bearer ${token}`}
});