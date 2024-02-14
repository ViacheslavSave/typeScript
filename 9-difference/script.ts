interface IA {
	a: number;
	b: string;
}
interface IB {
	a: number;
	c: boolean;
}

let a: IA = { a: 5, b: "10" };
let b: IB = { a: 5, c: true };



function difference<A extends Record<string, any>, B extends Record<string, any>>(a: A, b: B): Omit<A, keyof B> {
	const obj: Record<string, any>={}
	for (const key in a) {
		if (!(key in b)) {
			obj[key] = a[key];
		}
	}
	return obj as Omit<A, keyof B>
}

const res = difference(a, b);
console.log(res);
export {};