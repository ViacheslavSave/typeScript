const user = {
	name: "vasiliy",
	age: 8,
	skills: ["typescript", "javascript"],
};

function pickKeys<T, K extends Array<keyof T>>(obj: T, keys: K): Pick<T, K[number]> {
  const newObj: Pick<T, K[number]> = {} as Pick<T, K[number]>;
  keys.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
}