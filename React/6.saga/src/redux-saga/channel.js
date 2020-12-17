export default function stdChannel() {
  let currentTakers = [];
  function take(actionType, next) {
    next.actionType = actionType;
    next.cancel = () => {
      currentTakers = currentTakers.fill(item => item !== next);
    }
    currentTakers.push(next);
  }
  function put(action) {
    let takers = currentTakers;
    takers.forEach(taker => {
      if (action.type === taker.actionType) {
        taker.cancel();
        taker(action);
      }
    });
  }
  return {
    take,
    put
  }
}