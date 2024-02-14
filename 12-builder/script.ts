export type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IReq {
	addMethod: (method: method) => this;
	addBody: (body: string, value: any) => this;
	addHeaders: (header: string, value: string) => this;
	addUrl: (url: string, elemNum: number) => this;
	exec: () => Promise<unknown>;
}

export class RequestClass implements IReq {
	private method: method = "GET";
	private body: [string, any][] = [];
	private headers: [string, string][] = [];
	private url: string = "";

	addMethod(method: method) {
		this.method = method;
		return this;
	}

	addBody(prop: string, value: any) {
		this.body.push([prop, value]);
		return this;
	}

	addHeaders(header: string, value: string) {
		this.headers.push([header, value]);
		return this;
	}

	addUrl(url: string, elemNum: number) {
		this.url = `${url}/${elemNum}`;
		return this;
	}

	async exec() {
		if (!this.url) {
			console.log("Не указан URL");
			return;
		}

		const init: RequestInit = {
			method: this.method,
		};

		if (this.body.length) {
			if (this.method === "GET") {
				console.log("Невозможно отправить body методом GET");
				return;
			}
			init.body = JSON.stringify(Object.fromEntries(this.body));
		}
		if (this.headers.length) {
			init.headers = this.headers;
		}

		const res = await fetch(this.url, init);

		if (res.ok) {
			return await res.json();
		}
		throw new Error(` Ошибка выполнения запроса статус ${res.status}`);
	}
}

new RequestClass()
	.addMethod("PUT")
	.addBody("price", 20)
	.addBody("rating", 10)
	.addHeaders("Content-Type", "application/json")
	.addUrl("https://dummyjson.com/products", 12)
	.exec()
	.then(console.log)
	.catch((error) => console.log(error.message));
