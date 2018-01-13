const config = require('./config.json');

const Buxfer = require('../lib/buxfer');

test('Create Buxfer object', () => {
    const api = new Buxfer(config.token);
    expect(api.credentials).toEqual({'token': config.token});
});

test('get transactions', (done) => {
    const api = new Buxfer(config.token);
    api.getTransactions(function (error, data) {
        console.log(error, data);
        done();
    });
});