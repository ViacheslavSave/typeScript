declare module "sort-by" {
	export default function sortBy<T extends (obj1: recStrAny, obj2: recStrAny) => number>(...args: string[]): T;
}
