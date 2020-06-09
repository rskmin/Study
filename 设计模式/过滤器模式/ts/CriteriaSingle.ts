import Person from './Person'
import Criteria from "./Criteria";

export default class CriteriaFemale implements Criteria {
  meetCriteria(persons: Array<Person>): Array<Person> {
    const singlePersons: Array<Person> = []
    for (const item of persons) {
      item.getMaritalStatus().toLocaleUpperCase() === 'SINGLE' && singlePersons.push(item)
    }
    return singlePersons
  }
}