import Color from './Color'

export default class Green implements Color {
  fill(): void {
    console.log('Inside Green::fill() method.')
  }
}