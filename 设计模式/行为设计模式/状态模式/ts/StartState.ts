import State from "./State";
import Context from "./Context";

export default class StartState implements State {
  doAction(context: Context): void {
    console.log('Player is in start state')
    context.setState(this)
  }

  toString(): string {
    return 'Start State'
  }
}