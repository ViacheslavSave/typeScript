const user = {
	name: "vasiliy",
	age: 8,
	skills: ["typescript", "javascript"],
};

function pickObjectKeys<T extends E, K extends keyof T, E extends Pick<T, K>>(user: T, prop: K[]): E {
	return prop.reduce((acc, elem) => {
		acc[elem] = user[elem];
		return acc;
	}, {} as E);
}

const res1 = pickObjectKeys(user, ["name", "age"]);

const res2 = pickObjectKeys(user, ["name", "age", "age"]);
