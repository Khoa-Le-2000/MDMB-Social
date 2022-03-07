const crypto = require('crypto');

function getIV() {
    let result = new TextEncoder("utf-8").encode(process.env.CRYPTO_IV);
    return result;
}

function encrypt(text) {
    return new Promise((resolve, reject) => {
        var cipher = crypto.createCipheriv(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_KEY, getIV());
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        resolve(crypted);
    });
}

function decrypt(text) {
    return new Promise((resolve, reject) => {
        var decipher = crypto.createDecipheriv(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_KEY, getIV());
        var decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        // console.log('decrypted2: ' + decrypted);
        resolve(decrypted);
    });
}

module.exports = {
    encrypt,
    decrypt
};