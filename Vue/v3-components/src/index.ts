import { App } from 'vue';
import Input from '../src/packages/input';
import Button from '../src/packages/button';

const plugins = [
  Input,
  Button,
];

function install(app: App) {
  plugins.forEach(app.use);
}

export default {
  install,
}

export {
  Input,
  Button,
  install,
}
