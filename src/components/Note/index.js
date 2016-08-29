import React from 'react';
import NoteEditor from '../NoteEditor'

class Note extends React.Component {

  render() {
    return (
      <div className="note">
        <NoteEditor ref="editor"/>
      </div>
    );
  }
}

export default Note;
