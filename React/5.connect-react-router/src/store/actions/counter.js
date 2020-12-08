import { push } from '../../connected-react-router';

const actions = {
  go(path) {
    return push(path);
  }
}

export default actions;