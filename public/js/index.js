var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disonnected from the server');
});

socket.on('newMessage', function (message) {
    console.log('New message arrived', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#messageForm').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, function () {
        console.log('Got it');
    });
})

var locationButton = $('#sendLocation');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    
})