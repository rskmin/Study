import Cricket from './Cricket'
import Game from './Game'
import Football from './Football'

let game: Game = new Cricket()
game.play()
game = new Football()
game.play()