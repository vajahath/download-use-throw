import { expect } from "chai";
import useAndThrow = require("../src/index");
import { join } from "path";

describe("Testing use and throw", () => {
	it("should successfully complete cycle", done => {
		useAndThrow(
			"https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg",
			__dirname,
			(err: any, path: any, cb: any) => {
				cb();

				expect(err).to.be.null;
				expect(path.includes(__dirname)).to.be.true;
				done();
			}
		);
	});
});
