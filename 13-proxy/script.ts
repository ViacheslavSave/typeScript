import { RequestClass } from "../12-builder/script";
import type { IReq, method } from "../12-builder/script";

class Api implements IReq {
	constructor(private req: IReq) {}

	addHeaders(header: string, value: string) {
		this.req.addHeaders(header, value);
		return this;
	}

	addBody(prop: string, value: any) {
		this.req.addBody(prop, value);
		return this;
	}

	addMethod(method: method) {
		this.req.addMethod(method);
		return this;
	}

	addUrl(url: string, elemNum: number) {
		const maxElemNum = 10;
		if (elemNum > maxElemNum) {
			throw new Error(`Число не может быть больше ${maxElemNum}`);
		}
		this.req.addUrl(url, elemNum);
		return this;
	}
	exec() {
		return this.req.exec();
	}
}

const res = new Api(new RequestClass())
	.addMethod("PUT")
	.addBody("price", 20)
	.addBody("rating", 10)
	.addBody("newValue", 3333)
	.addHeaders("Content-Type", "application/json")
	.addUrl("https://dummyjson.com/products", 10)
	.exec()
	.then(console.log)
	.catch((error) => console.log(error.message));
