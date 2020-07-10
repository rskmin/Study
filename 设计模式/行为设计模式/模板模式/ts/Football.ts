import Game from './Game'

export default class Football extends Game {
  initialize(): void {
    console.log('Football Game Initialized! Start playing.')
  }
  startPlay(): void {
    console.log('Football Game Started. Enjoy the game!')
  }
  endPlay(): void {
    console.log('Football Game Finished!')
  }
}
