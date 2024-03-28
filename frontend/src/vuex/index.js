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
    authUser(state,payload){
      state.Nutzer.user_id = payload.Id,
      state.Nutzer.userRole = payload.Rolle
    },

    clearAuthData(state){
      state.Nutzer.user_id = null,
      state.Nutzer.userRole = null
    }
  },
  actions: {
    login({ commit },payload){
      axios.post('/users/login', payload)
      .then(res => {
        sessionStorage.setItem('Token', JSON.stringify(res.data.token))        
        sessionStorage.setItem('Nutzer', JSON.stringify(res.data.Nutzer)) 
        commit('authUser', res)    
      })
      .catch(error => {
        alert(error)
      })
    },
  },
  modules: {
  }
})
