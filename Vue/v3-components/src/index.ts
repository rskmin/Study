import Input from '../src/packages/input';
import { App } from 'vue';

const plugins = [
  Input,
];

function install(app: App) {
  plugins.forEach(app.use);
}

export {
  Input,
  install,
}
