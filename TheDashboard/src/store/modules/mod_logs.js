import logsAPIs from '@/api/logs'
import * as types from '../mutation-types'

// initial state
const state = {
  logs: {}
}

// getters
const getters = {
  logs: state => state.logs
}

// actions
const actions = {
  fetchLogs ({ commit, state }, page) {
    logsAPIs.getLogs(page).then(response => {
      if (response.status === 200) {
        commit(types.LOGS_FETCHED, response.data.logs)
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
  [types.LOGS_FETCHED] (state, newLogs) {
    state.logs = {
      ...state.logs,
      ...newLogs
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
