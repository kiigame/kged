import React from 'react';
import Sidebar from 'components/sidebar';
import Preview from 'components/preview';
import Inspector from 'components/inspector';
import 'styles/app.css';

function app() {
  return (
    <div className="app container-fluid">
      <div className="row flex-grow-1">
        <Sidebar></Sidebar>
        <Preview></Preview>
        <Inspector></Inspector>
      </div>
    </div>
  );
}

export default app;
