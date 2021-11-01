import { defineStore } from "pinia"
import AuthService from "../services/auth.service"
import AuthUserService from "../services/authUser.service"

let user: any = null
const item = localStorage.getItem("user")
if (typeof item === "string") user = JSON.parse(item)

const state = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null }

export const useLoggedInUserStore = defineStore({
	id: "loggedInUser",
	state: () => {
		return state
	},
	actions: {
		async login(userCred: any) {
			try {
				const userFromDb = await AuthService.login(userCred)
				this.status.loggedIn = true
				this.user = userFromDb

				return Promise.resolve(user)
			} catch (error) {
				this.status.loggedIn = false
				this.user = null
				return Promise.reject(error)
			}
		},
		logout() {
			AuthService.logout()
			this.status.loggedIn = false
			this.user = null
		},
		register(user: any) {
			return AuthService.register(user).then(
				(response) => {
					this.status.loggedIn = false
					return Promise.resolve(response.data)
				},
				(error) => {
					this.status.loggedIn = false
					return Promise.reject(error)
				}
			)
		},
		changeUserPropValue(name: string, value: string) {
			this.user[name] = value
		},
		changeUserAvatar(ava: any) {
			this.user.img = ava
		},
		saveUserDataChanges() {
			AuthUserService.saveUserDataChanges(this.user)
		},
	},
})

//import AuthService from "../services/auth.service"

/* const user = JSON.parse(localStorage.getItem("user"))
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null } */

/* export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return AuthService.login(user).then(
				(user) => {
					commit("loginSuccess", user)
					return Promise.resolve(user)
				},
				(error) => {
					commit("loginFailure")
					return Promise.reject(error)
				}
			)
		},
		logout({ commit }) {
			AuthService.logout()
			commit("logout")
		},
		register({ commit }, user) {
			return AuthService.register(user).then(
				(response) => {
					commit("registerSuccess")
					return Promise.resolve(response.data)
				},
				(error) => {
					commit("registerFailure")
					return Promise.reject(error)
				}
			)
		},
	},
	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true
			state.user = user
		},
		loginFailure(state) {
			state.status.loggedIn = false
			state.user = null
		},
		logout(state) {
			state.status.loggedIn = false
			state.user = null
		},
		registerSuccess(state) {
			state.status.loggedIn = false
		},
		registerFailure(state) {
			state.status.loggedIn = false
		},
	},
} */
