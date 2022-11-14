import { createApp } from 'vue'
import MessageWall from './components/MessageWall.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(MessageWall)
  .use(ElementPlus)
  .mount('#app')
