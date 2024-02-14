class User {
	@allowFunc((a: number) => a > 0 && a < 10)
	age: number;
}

function allowFunc(func: Function) {
	return (target: Object, propoertyKey: string | symbol) => {
		let value: number;

		function setter(newValue: number) {
			if (func(newValue)) {
				value = newValue;
				return;
			}
			throw new Error("Неверное значение");
		}

		function getter() {
			return value;
		}

		Object.defineProperty(target, propoertyKey, {
			set: setter,
			get: getter,
		});
	};
}

export {};
