"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://dummyjson.com/users1";
const url1 = new URL("https://dummyjson.com/users1");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["O_NEG"] = "O-";
    BloodGroup["O_POS"] = "O+";
    BloodGroup["A_NEG"] = "A-";
    BloodGroup["A_POS"] = "A+";
    BloodGroup["B_NEG"] = "B-";
    BloodGroup["B_POS"] = "B+";
    BloodGroup["AB_NEG"] = "AB-";
    BloodGroup["AB_POS"] = "AB+";
})(BloodGroup || (BloodGroup = {}));
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responce = yield fetch(url);
            if (responce.ok) {
                return responce.json();
            }
            else {
                throw new Error(`error status: ${responce.status} error text:${responce.statusText}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        return null;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    console.log(data);
}))();
// export {};
