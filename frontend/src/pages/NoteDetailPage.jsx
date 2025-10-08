
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        const data = await response.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        toast.success('Note updated successfully!');
        setIsEditing(false);
        setNote({ ...note, title, content });
      } else {
        toast.error('Failed to update note.');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('An error occurred while updating the note.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Note deleted successfully!');
        navigate('/');
      } else {
        toast.error('Failed to delete note.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('An error occurred while deleting the note.');
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
