import React from 'react';
import '../TerminalWindow.css'; 

const TerminalWindow = () => {
  return (
    <div className="window">
      <div className="bar">
        <div className="buttons">
          <div className="button"></div>
          <div className="button"></div>
          <div className="button"></div>
        </div>
        <span className="title"></span>
      </div>
      <div id="terminal">
        
      </div>
    </div>
  );
};
export default TerminalWindow;
