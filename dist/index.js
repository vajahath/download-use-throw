"use strict";
var fs = require("fs");
var got = require("got");
var path = require("path");
var shortid = require("shortid");
// blob downloader
var downloadBlob = function (url, inStream, cb) {
    got
        .stream(url)
        .on('error', function (err) { return cb(err); })
        .pipe(inStream)
        .on('finish', function () { return cb(); });
};
// blob cleaner
var deleteBlob = function (filePath) {
    fs.unlink(filePath, function (err) {
        if (err) {
            throw err;
        }
    });
};
module.exports = function (url, destinationPath, handlerFn) {
    if (!url || !handlerFn) {
        return handlerFn(new Error('url and handler functions are expected'), null, function () { return false; });
    }
    var fileName = path.join(destinationPath, '/' + shortid.generate());
    var blobStream = fs.createWriteStream(fileName);
    downloadBlob(url, blobStream, function (err) {
        if (err) {
            return handlerFn(err, null, function () { return deleteBlob(fileName); });
        }
        return handlerFn(null, fileName, function () {
            deleteBlob(fileName);
        });
    });
};
//# sourceMappingURL=index.js.map