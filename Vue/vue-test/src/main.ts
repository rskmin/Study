import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);


// import V3CompRm from 'v3-comp-rm';
// import 'v3-comp-rm/dist/index.css';
// console.log(V3CompRm);
// app.use(V3CompRm);

// import Input from 'v3-comp-rm/src/packages/input';
// app.use(Input);
import Button from 'v3-comp-rm/src/packages/button';
app.use(Button);

import MyCard from './packages/card/card';
console.log("MyCard", MyCard);
app.component('pl-my-card', MyCard);

app.mount('#app');
