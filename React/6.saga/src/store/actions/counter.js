const actions = {
  add() {
    return { type: 'ADD' };
  },
  asyncAdd() {
    return { type: 'ASYNC_ADD' };
  },
  minus() {
    return { type: 'MINUS' };
  },
  stop() {
    return { type: 'STOP_ADD' };
  }
}

export default actions;