import Person from './Person'
import Criteria from "./Criteria";

export default class CriteriaFemale implements Criteria {
  meetCriteria(persons: Array<Person>): Array<Person> {
    const femalePersons: Array<Person> = []
    for (const item of persons) {
      item.getGender().toLocaleUpperCase() === 'FEMALE' && femalePersons.push(item)
    }
    return femalePersons
  }
}