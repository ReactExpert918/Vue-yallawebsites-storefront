var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

export function copyArrayOfObjects(arr) {
    var copyArr = JSON.parse(JSON.stringify(arr));
    return copyArr;
}

function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}


export function createJWTToken(data) {
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    var token = encodedHeader + "." + encodedData;

    var secret = process.env.VUE_APP_JWT_SECRET;

    var signature = CryptoJS.HmacSHA256(token, secret);
    signature = base64url(signature);

    var signedToken = token + "." + signature;

    return signedToken;
}

export function parseAndVerifyJWTToken(token) {
    var secret = process.env.VUE_APP_JWT_SECRET;
    try {
        var payload = jwt.verify(token, secret);
        return payload;
    } catch (err) {
        return {};
    }

}