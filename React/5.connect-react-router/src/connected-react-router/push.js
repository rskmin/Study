export const CALL_HISTORY_METHOD = 'CALL_HISTORY_METHOD';
function push(path) {
  return {
    type: CALL_HISTORY_METHOD,
    payload: path
  }
}

export default push;