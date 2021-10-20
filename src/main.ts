import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "./plugins/font-awesome"
import { createPinia } from "pinia"

const pinia = createPinia()

createApp(App)
	.use(router)
	.use(pinia)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app")
