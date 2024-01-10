const url = "https://dummyjson.com/users1";
const url1= new URL( "https://dummyjson.com/users1")
enum Gender {
	MALE = "male",
	FEMALE = "female",
}
enum BloodGroup {
	O_NEG = "O-",
	O_POS = "O+",
	A_NEG = "A-",
	A_POS = "A+",
	B_NEG = "B-",
	B_POS = "B+",
	AB_NEG = "AB-",
	AB_POS = "AB+",
}

interface IHair {
	color: string;
	type: string;
}
interface ICoordinates {
	lat: number;
	lng: number;
}
interface IAddress {
	address: string;
	city: string;
	coordinates: ICoordinates;
	postalCode: string;
	state: string;
}
interface IBank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}
interface ICompany {
	address: IAddress;
	department: string;
	name: string;
	title: string;
}

interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: Gender;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: BloodGroup;
	height: number;
	weight: number;
	eyeColor: string;
	hair: IHair;
	domain: string;
	ip: string;
	address: IAddress;
	macAddress: string;
	university: string;
	bank: IBank;
	company: ICompany;
	ein: string;
	ssn: string;
	userAgent: string;
}

interface IResponce {
	users: IUser[];
	total: number;
	skip: number;
	limit: number;
}

async function getData(url: string): Promise<IResponce | null> {
	try {
		const responce = await fetch(url);
		if (responce.ok) {
			return responce.json();
		} else {
			throw new Error(`error status: ${responce.status} error text:${responce.statusText}`);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}

	return null;
}
(async () => {
	const data = await getData(url);
	console.log(data);
})();

