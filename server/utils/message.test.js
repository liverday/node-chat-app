var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        var from = 'Test';
        var text = 'Text test';
        var message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({ from, text}));
        done();
    });
});