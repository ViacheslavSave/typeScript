import sortBy from "sort-by";

const users :Record<string,any>[]= [
	{
		id: 7,
		name: "Foo",
		age: "34",
		email: { primary: "foo@email.com" },
	},
	{
		id: 4,
		name: "Bar",
		age: "67",
		email: { primary: "bar@email.com" },
	},
	{
		id: 3,
		name: "Baz",
		age: "67",
		email: { primary: "baz@email.com" },
	},
];
console.log(users.sort(sortBy("name", "email")));
export {};
