"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Person_1 = __importDefault(require("./Person"));
var CriteriaMale_1 = __importDefault(require("./CriteriaMale"));
var CriteriaFemale_1 = __importDefault(require("./CriteriaFemale"));
var CriteriaSingle_1 = __importDefault(require("./CriteriaSingle"));
var OrCriteria_1 = __importDefault(require("./OrCriteria"));
var AndCriteria_1 = __importDefault(require("./AndCriteria"));
var persons = [];
persons.push(new Person_1.default('Robert', 'Male', 'Single'));
persons.push(new Person_1.default("John", "Male", "Married"));
persons.push(new Person_1.default("Laura", "Female", "Married"));
persons.push(new Person_1.default("Diana", "Female", "Single"));
persons.push(new Person_1.default("Mike", "Male", "Single"));
persons.push(new Person_1.default("Bobby", "Male", "Single"));
var male = new CriteriaMale_1.default();
var female = new CriteriaFemale_1.default();
var single = new CriteriaSingle_1.default();
var singleMale = new AndCriteria_1.default(single, male);
var singleOrFemale = new OrCriteria_1.default(single, female);
console.log('Males: ');
printPersons(male.meetCriteria(persons));
console.log('Females: ');
printPersons(female.meetCriteria(persons));
console.log('Single Males: ');
printPersons(singleMale.meetCriteria(persons));
console.log('Single Or Females: ');
printPersons(singleOrFemale.meetCriteria(persons));
function printPersons(persons) {
    for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
        var person = persons_1[_i];
        console.log("Person : [ Name : " + person.getName() + ", Gender : " + person.getGender() + ", Marital Status : " + person.getMaritalStatus() + " ]");
    }
}
