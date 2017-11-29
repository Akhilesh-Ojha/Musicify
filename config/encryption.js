var crypto = require('crypto');
var keys = require('./keys');

module.exports = {

    encrypt: function (text) {
        var cipher = crypto.createCipher(keys.crypto.algorithm, keys.crypto.key, "");
        var encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log('After encrypting ' + text + '--- ' + encrypted);
        return encrypted;
    },

    decrypt: function (text) {
        var decipher = crypto.createDecipher(keys.crypto.algorithm, keys.crypto.key, "");
        var decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log('After decrypting ' + text + '--- ' + decrypted);
        return decrypted;
    }

};