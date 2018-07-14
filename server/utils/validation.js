var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

var nameAlreadyExists = (users, name, room) => {
    return users.users.filter(user => user.room === room && user.name === name).length > 0
}

module.exports = { isRealString, nameAlreadyExists };