import Color from './Color'

export default class Blue implements Color {
  fill(): void {
    console.log('Inside Blue::fill() method.')
  }
}