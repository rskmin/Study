import Input from './input';
import { App } from 'vue';

export default {
  ...Input,
  install(app: App) {
    app.component(Input.name, Input);
  },
}
