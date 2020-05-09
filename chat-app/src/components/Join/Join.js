import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {

    // set the state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="outer-join-container">
            <div className="inner-join-container">
                <h1 className="heading"><i className="fas fa-sms"></i> Chatinger</h1>
                <div><input type="text" placeholder="Enter your name" className="join-input mt-20" onChange={(e) => setName(e.target.value)}/></div>
                <div><input type="text" placeholder="Enter the group name you want to join" className="join-room mt-20" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="join-btn mt-20">Join the chat</button>
                </Link>
            </div> 
        </div>
    )
}

export default Join
