import Vue from 'vue'

const state = {
  bdToken: ''
}

const mutations = {
  updateToken(state, token) {
    state.bdToken = token
  }
}

const actions = {
  getBdToken(context, type) {
    // this 指的是store
    // console.log(this);
    return new Promise((resolve, reject) => {
      Vue.axios.post('/server/api/getToken', { tokenName: 'bdToken', tokenType: type || 'face' }).then(res => {
        context.commit('updateToken', res.data);
        // console.log("res", res.data);
        resolve(res.data);
      }).catch(error => {
        console.log(error);
        reject(error);
      })
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
