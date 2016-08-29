import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import NotesLists from '../NotesLists'
import Note from '../Note'
import Toolbar from '../Toolbar'

export default class App extends Component {
  render() {
    return (
      <div className="view-home">
        <Toolbar />
        <div className="view-content">
          <Sidebar />
          <NotesLists />
          <Note />
        </div>
      </div>
    );
  }
}
