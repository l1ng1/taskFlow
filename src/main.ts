import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { useTasksStore } from './stores/tasks'


const pinia = createPinia()
const app = createApp(App);



app.use(pinia);

const store = useTasksStore();
store.loadFromStorage();


app.mount('#app')
