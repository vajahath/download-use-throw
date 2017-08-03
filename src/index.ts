import * as fs from 'fs';
import * as got from 'got';
import * as path from 'path';
import * as shortid from 'shortid';

// blob downloader
const downloadBlob = (url: string, inStream: any, cb: any) => {
	got
		.stream(url)
		.on('error', (err: any) => cb(err))
		.pipe(inStream)
		.on('finish', () => cb());
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
export = (url: string, destinationPath: string, handlerFn: any) => {
	if (!url || !handlerFn) {
		return handlerFn(
			new Error('url and handler functions are expected'),
			null,
			() => false,
		);
	}

	const fileName = path.join(destinationPath, '/' + shortid.generate());
	const blobStream = fs.createWriteStream(fileName);

	downloadBlob(url, blobStream, (err: object) => {
		if (err) {
			return handlerFn(err, null, () => deleteBlob(fileName));
		}
		return handlerFn(null, fileName, () => {
			deleteBlob(fileName);
		});
	});
};
