import React from 'react';

const Toolbar = ({ className }) => {
  return (
    <header className="toolbar">
      <div className="container">
        <nav className="navbar navbar-default">
          <a href="" className="navbar-brand">Snote</a>
        </nav>
      </div>
    </header>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
