interface IPost {
	id: number;
	date: Date;
	title: string;
}

const arr: IPost[] = [
	{ id: 2, date: new Date(2023, 0, 1, 3), title: "title" },
	{ id: 4, date: new Date(2023, 0, 3), title: "title1" },
	{ id: 1, date: new Date(2023, 0, 2), title: "title2" },
];

interface IIterator<T> {
	current(): T | undefined;
	next(): T | undefined;
	prev(): T | undefined;
	index(): number;
}

abstract class AbstractIPostIterator implements IIterator<IPost> {
	private position: number = 0;
	protected postList: IPost[]=[];

	current(): IPost | undefined {
		return this.postList[this.position];
	}
	next(): IPost | undefined {
		this.position += 1;
    return this.postList[this.position];
	}
	prev(): IPost | undefined {
		this.position -= 1;
		return this.postList[this.position];
	}
	index(): number {
		return this.position;
	}
}

function sortById(arr: IPost[], sortingType: "asc" | "desc" = "asc"): IPost[] {
	return [...arr].sort((a, b) => (a.id - b.id) * (sortingType == "asc" ? 1 : -1));
}

function sortByDate(arr: IPost[], sortingType: "asc" | "desc" = "asc"): IPost[] {
	return [...arr].sort((a, b) => (a.date.getTime() - b.date.getTime()) * (sortingType == "asc" ? 1 : -1));
}

class PostIteratorByDate extends AbstractIPostIterator {
	constructor(arr: IPost[], sortingType: "asc" | "desc" = "asc") {
		super();
		this.postList = sortByDate(arr, sortingType);
	}
}

class PostIteratorById extends AbstractIPostIterator {
	constructor(arr: IPost[], sortingType: "asc" | "desc" = "asc") {
		super();
		this.postList = sortById(arr, sortingType);
	}
}

const res = new PostIteratorByDate(arr);
console.log(res);

const res2 = new PostIteratorById(arr);
console.log(res2);
console.log(res2.current());
console.log(res2.next());
console.log(res2.next());
console.log(res2.next());


export {};
