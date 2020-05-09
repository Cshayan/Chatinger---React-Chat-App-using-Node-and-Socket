import React from 'react'
import './InfoBar.css';

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <span className="online"></span>
                <h4>{room}</h4>
            </div>
            <div className="rightInnerContainer">
              <a href="/" title="Leave Group"><i className="fas fa-window-close "></i></a>
            </div>
        </div>
    )
}

export default InfoBar
