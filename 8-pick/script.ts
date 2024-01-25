interface IUser {
	[prop: string | symbol]: unknown;
}

const user = {
	name: "vasiliy",
	age: 8,
	skills: ["typescript", "javascript"],
};

function pickObjectKeys<T extends IUser>(user: T, prop: (keyof T)[]): IUser {
	return prop.reduce<IUser>((acc, elem) => {
		acc[elem] = user[elem];
		return acc;
	}, {});
}
// работает
const res = pickObjectKeys(user, ["name", "age"]);

// работает,нет ошибки      как можно ограничить в ts использование дубликатов ?
const res2 = pickObjectKeys(user, ["name", "age", "age"]);
console.log(res);

//----------------------------------------------------------------------------

const arr = ["age", "name"] as const;

// как в функции можно получить такой тип  unionType  если он приходит в параметры функции ?
//       ↓
type unionType = (typeof arr)[number];

type newTypeUser = getNewType<typeof user, unionType>;

type getNewType<T, E extends keyof T> = {
	[prop in keyof T as Extract<prop, E >]: T[prop];
  // [P in Extract<keyof T, E>]: T[P]; 
};

export{}