import Person from './Person'
import Criteria from './Criteria';
import CriteriaMale from './CriteriaMale';
import CriteriaFemale from './CriteriaFemale';
import CriteriaSingle from './CriteriaSingle'
import OrCriteria from './OrCriteria';
import AndCriteria from './AndCriteria';

const persons: Array<Person> = []

persons.push(new Person('Robert', 'Male', 'Single'))
persons.push(new Person("John","Male", "Married"));
persons.push(new Person("Laura","Female", "Married"));
persons.push(new Person("Diana","Female", "Single"));
persons.push(new Person("Mike","Male", "Single"));
persons.push(new Person("Bobby","Male", "Single"));

const male: Criteria = new CriteriaMale()
const female: Criteria = new CriteriaFemale()
const single: Criteria = new CriteriaSingle()
const singleMale = new AndCriteria(single, male)
const singleOrFemale = new OrCriteria(single, female)

console.log('Males: ')
printPersons(male.meetCriteria(persons))

console.log('Females: ')
printPersons(female.meetCriteria(persons))

console.log('Single Males: ')
printPersons(singleMale.meetCriteria(persons))

console.log('Single Or Females: ')
printPersons(singleOrFemale.meetCriteria(persons))

function printPersons(persons: Array<Person>) {
  for (const person of persons) {
    console.log(`Person : [ Name : ${person.getName()}, Gender : ${person.getGender()}, Marital Status : ${person.getMaritalStatus()} ]`)
  }
}