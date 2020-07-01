import Game from './Game'

export default class Cricket extends Game {
  initialize(): void {
    console.log('Cricket Game Initialized! Start playing.')
  }
  startPlay(): void {
    console.log('Cricket Game Started. Enjoy the game!')
  }
  endPlay(): void {
    console.log('Cricket Game Finished!')
  }
}
