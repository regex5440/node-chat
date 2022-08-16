import './en.json';
const Lang = require('config').get('LANG');

module.exports = {
    ...`${Lang}.json`
};