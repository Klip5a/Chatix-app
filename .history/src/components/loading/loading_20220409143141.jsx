import React from 'react';
import './loading.css';

function Loading() {
  return (
    // <div className="loading-container">
    //   <div className="spinner-border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
