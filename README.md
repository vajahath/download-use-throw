# download-use-throw
Download something - use it - finally delete it

[![npm](https://img.shields.io/npm/v/download-use-throw.svg)](https://www.npmjs.com/package/download-use-throw)
[![Build Status](https://travis-ci.org/vajahath/download-use-throw.svg?branch=master)](https://travis-ci.org/vajahath/download-use-throw)
[![styled with prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/dt/download-use-throw.svg)]()
[![Built with generator-ts-np](https://img.shields.io/badge/scaffolding-ts_np-2699ad.svg)](https://github.com/vajahath/generator-ts-np)

## What?
This package helps you to temporarily download an image and apply your method on it. When you are finished using the downloaded content, the image will automatically get deleted.

![](media/logo.png)

This package is using Nodejs [streams](https://nodejs.org/api/stream.html), means, more efficient.

## Install
```
npm i --save download-use-throw
```
## Usage
```js
const useAndThrow = require('download-use-throw');
const path = require('path');

// path to the directory to which
// images are temporarily downloaded
const dirPath = path.join(__dirname, '/temp');

// url of the image to be downloaded
const imgUrl = "https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg";

// use and throw
useAndThrow(imgUrl, dirPath, imageHandler);

// function to apply on the downloaded image
function imageHandler(err, pathToImage, done) {
    if(err){
        // handle err

        return done(); // call to done will trigger the deletion process.
    }

    // use the image
    useTheImage(pathToImage); // your function
    // ...
    // ...
    // ...

    // when you finished using the image, call done()
    // which will trigger the deletion process
    done();
}

```
Call `done()` when you finished using the image, or you finished handling errors. It will initiate the deletion process.

Unclear about something? Please rise an [issue](https://github.com/vajahath/download-use-throw/issues).<br>
Please report any issues at [github](https://github.com/vajahath/download-use-throw).

[![used version of ts-np generator](https://img.shields.io/badge/ts--np-v0.0.23-a5a5a5.svg?style=flat-square)](https://github.com/vajahath/generator-ts-np)

## Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
