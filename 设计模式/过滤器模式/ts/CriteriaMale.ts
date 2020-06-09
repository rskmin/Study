import Person from './Person'
import Criteria from "./Criteria";

export default class CriteriaMale implements Criteria {
  meetCriteria(persons: Array<Person>): Array<Person> {
    const malePerson: Array<Person> = []
    for (const item of persons) {
      item.getGender().toLocaleUpperCase() === 'MALE' && malePerson.push(item)
    }
    return malePerson
  }
}