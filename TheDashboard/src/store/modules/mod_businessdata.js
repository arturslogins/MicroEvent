import businessDataAPIs from '@/api/businessData'
import * as types from '../mutation-types'

// initial state
const state = {
  usersStatistics: null,
  stuffSample: '',
  overallErrors: []
}

// getters
const getters = {
  usersStatistics: state => state.usersStatistics,
  stuffSample: state => state.stuffSample,
  overallErrors: state => state.overallErrors
}

// actions
const actions = {
  fetchStuffSample ({ commit, state }) {
    businessDataAPIs.getStuffSample().then(response => {
      if (response.status === 200) {
        commit(types.STUFF_SAMPLE_FETCHED, response.data)
      } else {
        console.error('Received ' + response.status + ' from backend. Response object:')
        console.error(response)
      }
    }).catch(err => {
      console.error(err)
    })
  },
  fetchOverallErrors ({ commit, state }) {
    businessDataAPIs.getUserBehaviourStatistics().then(response => {
      if (response.status === 200) {
        commit(types.OVERALL_ERRORS_FETCHED, response.data)
      } else {
        console.error('Received ' + response.status + ' from backend. Response object:')
        console.error(response)
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

// mutations
const mutations = {
  [types.STUFF_SAMPLE_FETCHED] (state, stuffSample) {
    state.stuffSample = stuffSample
  },
  [types.OVERALL_ERRORS_FETCHED] (state, userBehaviour) {
    state.overallErrors = userBehaviour.overallErrors
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
