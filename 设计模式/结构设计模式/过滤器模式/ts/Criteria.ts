import Person from './Person'

export default interface Criteria {
  meetCriteria(persons: Array<Person>): Array<Person>
}