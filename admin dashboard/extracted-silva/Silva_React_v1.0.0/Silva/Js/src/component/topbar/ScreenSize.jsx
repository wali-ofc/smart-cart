import { useState } from 'react';
import { Maximize } from 'react-feather';
const ScreenSize = () => {
  const [, setFullScreenOn] = useState(false);
  const toggleFullScreen = () => {
    const document = window.document;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
      setFullScreenOn(true);
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      setFullScreenOn(false);
    }
  };
  return <li className="d-none d-sm-flex">
            <button type="button" className="btn nav-link" data-toggle="fullscreen" onClick={toggleFullScreen}>
                <Maximize className="align-middle fullscreen noti-icon" />
            </button>
        </li>;
};
export default ScreenSize;