"use strict";
var fs = require("fs");
var got = require("got");
var path = require("path");
var shortid = require("shortid");
// blob downloader
var downloadBlob = function (url, inStream, cb) {
    got
        .stream(url)
        .pipe(inStream)
        .on('error', function (err) { return cb(err); })
        .on('close', function () { return cb(); });
};
// blob cleaner
var deleteBlob = function (filePath) {
    fs.unlink(filePath, function (err) {
        if (err) {
            throw err;
        }
    });
};
module.exports = function (url, destinationPath, fn) {
    if (!url || !fn) {
        throw new Error('url and handler functions are expected');
    }
    var fileName = path.join(destinationPath, '/' + shortid.generate());
    var blobStream = fs.createWriteStream(fileName);
    downloadBlob(url, blobStream, function (err) {
        if (err) {
            return fn(err);
        }
        fn(null, fileName, function () {
            deleteBlob(fileName);
        });
    });
};
//# sourceMappingURL=index.js.map