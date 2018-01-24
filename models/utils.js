
const mysql = require('mysql');
const { config } = require('../config');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    charset: 'UTF8_GENERAL_CI',
    debug: false,
    supportBigNumbers: true
});

const queryFormat = mysql.format;

const P = function () {
    let that = arguments[0];
    let fn = arguments[1];
    let args = Array.prototype.slice.call(arguments, 2);
    return new Promise(function (resolve, reject) {
        let callback = function () {
            if (arguments[0] instanceof Error) {
                return reject(arguments[0]);
            } else if (arguments.length < 2) {
                resolve(arguments[0]);
            } else {
                if (arguments[0]) {
                    reject(arguments[0]);
                } else {
                    resolve(arguments[1]);
                }
            }
        };
        args.push(callback);
        if (fn === 'query') {
            let queryString;
            if (typeof args[1] === 'function') {
                queryString = args[0];
            } else {
                queryString = mysql.format(args[0], args[1]);
            }
            // console.log(`[MYSQL] ${queryString}`);
        }
        that[fn].apply(that, args);
    });
};

module.exports = {
    P: P,
    pool: pool,
    queryFormat: queryFormat
}