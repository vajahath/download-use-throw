import * as fs from 'fs';
import * as got from 'got';
import * as path from 'path';
import * as shortid from 'shortid';

// blob downloader
const downloadBlob = (url: string, inStream: any, cb: any) => {
	got
		.stream(url)
		.pipe(inStream)
		.on('error', (err: object) => cb(err))
		.on('close', () => cb());
};

// blob cleaner
const deleteBlob = (filePath: string) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			throw err;
		}
	});
};

// controller - main function
export = (url: string, destinationPath: string, fn: any) => {
	if (!url || !fn) {
		throw new Error('url and handler functions are expected');
	}

	const fileName = path.join(destinationPath, '/' + shortid.generate());
	const blobStream = fs.createWriteStream(fileName);

	downloadBlob(url, blobStream, (err: object) => {
		if (err) {
			return fn(err);
		}
		fn(null, fileName, () => {
			deleteBlob(fileName);
		});
	});
};
