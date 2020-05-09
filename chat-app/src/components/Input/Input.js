import React from 'react'
import './Input.css';

const Input = ({message, setMessage, sendMessage}) => {
    return (
        <form className="form">
        <input
            type="text"
            className="input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}        
            />                   
        <button title="Send message" className="sendButton" onClick={(e) => sendMessage(e)}><i className="fas fa-paper-plane"></i></button>    
        </form>
    )
}

export default Input;
