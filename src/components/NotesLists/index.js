import React from 'react';

const NotesLists = ({ className }) => {
  return (
    <div className="notes-list">
      <div className="note-item">
        <h4 className="title">Grocery List</h4>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eius</p>
      </div>
      <div className="note-item active">
        <h4 className="title">What I Learned Building Medium (So Far)</h4>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eius</p>
      </div>
      <div className="note-item">
        <h4 className="title">Books to read</h4>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eius</p>
      </div>
      <div className="note-item">
        <h4 className="title">Swift code samples</h4>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eius</p>
      </div>
      <div className="note-item">
        <h4 className="title">Online comics</h4>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eius</p>
    </div>
    </div>
  );
};

NotesLists.displayName = 'NotesLists';


export default NotesLists;
