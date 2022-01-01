import { createStore } from 'vuex'
import router from '../router'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state() {
    return {
      teams: {},
      socketid: null,
    }
  },
  getters: {
    getConfig: (state) => {
      if('config' in state){
        return state.config
      } else {
        return false
      }
    },
    state: (state) => {
      return state
    },
    teams: (state) => {
      const obj = state.teams
      if(Object.keys(obj).length > 0){
        delete obj[state.socketid]
        return state.teams
      } else {
        return false
      }
    }
  },
  mutations: {
    setConfig(state, config) {
      state.config = config
      if(config === null) {
        router.push({name: 'Setup'})
      }
    },
    user_login(state, data) {
      state.teams = data
    },
    setid(state, id) {
      state.socketid = id
      console.log(id)
    },
    user_logout(state, id) {
      delete state.teams[id]
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
