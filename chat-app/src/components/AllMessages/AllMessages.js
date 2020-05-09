import React from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import './AllMessage.css';

function AllMessages({allMessages, name}) {
    return (
        <ScrollToBottom className="messages">
            {allMessages.map((message, index) => <div key={index}><Message message={message} name={name}/></div>)}
        </ScrollToBottom>
    )
}

export default AllMessages
