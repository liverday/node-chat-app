var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Test';
        var text = 'Text test';
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({ from, text }));
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Test';
        var latitude = '-23.01415'
        var longitude = '41.01091'
        var url = `https://www.google.com/maps?q=${latitude},${longitude}` 
        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({ from, url }));
    })
})