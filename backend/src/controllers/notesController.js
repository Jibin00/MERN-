import Note from '../models/Notes.js';

export async function getAllNotes  (_, res)  {
try {
    const notes = await Note.find();
    res.status(200).json(notes);
}catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
}

}

export async function createNote (req, res)  {
try {
  const { title, content } = req.body
  const newNote = new Note({ title, content });
  
  await newNote.save();  res.status(201).json({ message: "Note created successfully", note: newNote });  

} catch (error) {
  console.error("Error creating note:", error);
  res.status(500).json({ message: "Internal Server Error" }); 
}
}               

export function updateNote (req, res)  {
  res.status(200).json({ message: "Note updated successfully" });
}

export function deleteNote (req, res)  {
  res.status(200).json({ message: "Note deleted successfully" });   
}