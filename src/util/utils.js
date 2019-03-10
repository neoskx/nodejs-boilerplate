const _ = require('lodash');

function getNumber(val){
    let num = val.match(/([+-]?[\s]*[\d]+[\d,\.\s]*)/)||[];
    num = num[0];
    if(!num){
        return NaN;
    }else{
        // remove , and \s
        num = num.replace(/[,\s]/g, '');
        return parseFloat(num);
    }
}


/**
 *  Encode a string to base64
 *
 * @param {*} str - string want to encode, if it isn't a string, will automatically convert to a string
 * @return {string} - base64 string
 */
function btoa(str){
    // if it is undefined or null, direct return back
    if(str === undefined || str === null){
        return str;
    }

    // if it is object, then json stringify
    if(typeof str === 'object'){
        str = JSON.stringify(str);
    }else{
        str = str.toString();
    }
    return Buffer.from(str).toString('base64')
}

/**
 *  Decode a base64 to a string
 *
 * @param {*} str - base64 string want to decode
 * @return {string} - string
 */
function atob(str){
    return Buffer.from(str, 'base64').toString('ascii');
}

module.exports = {
    getNumber,
    btoa,
    atob
}