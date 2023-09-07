
import React from 'react';
import videoBg from './video.mp4';
class VideoBackground extends React.Component {
  render() {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }}>
        <video autoPlay muted loop style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }}>
          <source src={videoBg} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default VideoBackground;