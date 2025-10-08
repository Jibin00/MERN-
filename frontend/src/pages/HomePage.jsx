
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);
        const data = await response.json();

        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div className="notes-grid">
        {notes.map((note) => (
          <Link to={`/notes/${note._id}`} key={note._id} className="note-card">
            <h2>{note.title}</h2> 
            <p>{note.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
