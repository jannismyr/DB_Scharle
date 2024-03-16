import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    Nutzer: {
      user_id: null,
      userRole: null
    }
  },
  getters: {
    user_id (state){
      return state.Nutzer.user_id
    },
    userRole (state){
      return state.Nutzer.userRole
    }
  },
  mutations: {
    authUser(state,userData){
      state.Nutzer.user_id = userData.Id,
      state.Nutzer.userRole = userData.Rolle
    },

    clearAuthData(state){
      state.Nutzer.user_id = null,
      state.Nutzer.userRole = null
    }
  },
  actions: {
    login({commit}, authData){
      axios.post('http://localhost:8000/users/login', authData)
      .then(res => {
        console.log("Backend Response", res);
        commit('authUser', {
          Id: res.data[0].Id,
          Rolle: res.data[0].Rolle
        })
      })
    }
  },
  modules: {
  }
})
