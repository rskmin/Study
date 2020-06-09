import Criteria from "./Criteria";
import Person from "./Person";

export default class OrCriteria implements Criteria {
  private criteria: Criteria
  private otherCriteria: Criteria

  constructor(criteria: Criteria, otherCriteria: Criteria) {
    this.criteria = criteria
    this.otherCriteria = otherCriteria
  }

  meetCriteria(persons: Array<Person>): Array<Person> {
    const firstCriteriaItems: Array<Person> = this.criteria.meetCriteria(persons)
    const otherCriteriaItems: Array<Person> = this.otherCriteria.meetCriteria(persons)

    for (const item of otherCriteriaItems) {
      firstCriteriaItems.indexOf(item) < 0 && firstCriteriaItems.push(item)
    }

    return firstCriteriaItems
  }
}