const SimpleCrypto = require('simple-crypto-js').default;

const ENCRYPTION_KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'
exports.decrypt = (text) => {
    const simpleCrypto = new SimpleCrypto(ENCRYPTION_KEY);
    return  simpleCrypto.decrypt(text);
};

exports.encrypt = (text) => {
    const simpleCrypto = new SimpleCrypto(ENCRYPTION_KEY);
    return simpleCrypto.encrypt(text);
};