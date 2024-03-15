import React from 'react';
import './homeVid.css';

const HomeVid = () => {
  return (
    <div className="video-container">
      <video controls className="video" height="360" src="./images/HomeVid.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVid; 
