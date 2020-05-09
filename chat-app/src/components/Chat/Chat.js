import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import AllMessages from '../AllMessages/AllMessages';
import './Chat.css';

let socket;

const Chat = ({location}) => {

    // set the state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const endPoint = 'https://chatinger.herokuapp.com/';

    // lifecycle method - useEffect to get the query parameters and users joining the chat
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        // make socket request to backend
        socket = io(endPoint)

        // set the state of the variables
        setName(name);
        setRoom(room);

        // emit events with socket
        socket.emit('join', { name, room }, () => {
            
        });

        // on disconnection, emit a event with socket
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [endPoint, location.search]);

    // get the messages and update the sate
    useEffect(() => {
        socket.on('message', (message) => {
            setAllMessages(allMessages => [...allMessages, message]);
        });
    }, []);

    // Function to send message
    const sendMessage = (e) => {
        e.preventDefault();
       
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
            setMessage('');
        }
    }   

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <AllMessages allMessages={allMessages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
