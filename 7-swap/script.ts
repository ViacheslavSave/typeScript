const obj = {
	a: 1,
	b: 2,
};

function swapDeysAndVakues<S extends string, N extends number>(obj: Record<S, N>): Record<N, S> {
	const res = Object.entries(obj).map(([key, value]) => [value, key]);
	return Object.fromEntries(res);
}
