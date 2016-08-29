import React from 'react';

const Sidebar = ({ className }) => {
  return (
    <div className="sidebar">
      <div className="nav nav-vertical">
        <a href="" className="nav-link active"><i className="fa fa-sticky-note-o"></i> Notes</a>
        <a href="" className="nav-link"><i className="fa fa-trash-o"></i> Trash</a>
      </div>
      <div className="nav nav-vertical">
        <a href="" className="nav-link"><i className="fa fa-hashtag"></i> Notes</a>
        <a href="" className="nav-link"><i className="fa fa-trash-o"></i> Trash</a>
      </div>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
