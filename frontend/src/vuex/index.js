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
    login(authData){
      axios.post('http://localhost:8000/users/login', authData)
      .then(res => {
        sessionStorage.setItem('Kunde', JSON.stringify(res.data))        
      })
    }
  },
  modules: {
  }
})
