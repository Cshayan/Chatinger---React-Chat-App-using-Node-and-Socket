/* File to manage all the users in the chat */

let users = [];

const addUser = ({ id, name, room }) => {
    // trim and convert into all lower case
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // if a same user with same name already exists in the same room, then it is not allowed
    const existingUser = users.find((user) => user.name === name && user.room === room);

    if (existingUser) {
        return { error: 'UserName is already taken. Please use any other name.' }
    }

    const user = { id, name, room };

    users.push(user);

    return { user };
}

const removeUser = ( id ) => {
    
    // check if the user with the id already exists
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    // return the specified user
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    // return all the users in a room
    return users.filter((user) => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
