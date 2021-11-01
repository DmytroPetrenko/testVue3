import { createWebHistory, createRouter } from "vue-router"
import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
// lazy-loaded
const Profile = () => import("./views/Profile.vue")
const BoardAdmin = () => import("./views/BoardAdmin.vue")
const BoardModerator = () => import("./views/BoardModerator.vue")
const BoardUser = () => import("./views/BoardUser.vue")

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/profile",
		name: "profile",
		// lazy-loaded
		component: Profile,
	},
	{
		path: "/admin",
		name: "admin",
		// lazy-loaded
		component: BoardAdmin,
	},
	{
		path: "/mod",
		name: "moderator",
		// lazy-loaded
		component: BoardModerator,
	},
	{
		path: "/user",
		name: "user",
		// lazy-loaded
		component: BoardUser,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
