var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else { 
            console.log('No error');
        }

    });
});

socket.on('disconnect', function () {
    console.log('Disonnected from the server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('hh:mm');
    var template = $('#messageTemplate').html();
    var html = Mustache.render(template, {
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('hh:mm');
    var template = $('#locationMessageTemplate').html();
    var html = Mustache.render(template, {
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    })
    $('#messages').append(html);
    scrollToBottom();
});

$('#messageForm').on('submit', function (e) {
    e.preventDefault();
    var messageBox = $('input[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function () {
        messageBox.val('');
    });


})

var locationButton = $('#sendLocation');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch the location');
    }, {
            enableHighAccuracy: true,
            maximumAge: 0
        })
})