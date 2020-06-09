import Person from './Person'
import Criteria from "./Criteria";

export default class AndCriteria implements Criteria {
  private criteria: Criteria
  private otherCriteria: Criteria

  constructor(criteria: Criteria, otherCriteria: Criteria) {
    this.criteria = criteria
    this.otherCriteria = otherCriteria
  }

  meetCriteria(persons: Array<Person>): Array<Person> {
    const firstCriteriaPersons: Array<Person> = this.criteria.meetCriteria(persons)
    return this.otherCriteria.meetCriteria(firstCriteriaPersons)
  }
}