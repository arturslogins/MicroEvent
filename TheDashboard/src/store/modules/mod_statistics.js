import businessDataAPIs from '@/api/businessData'
import * as types from '../mutation-types'

// initial state
const state = {
  stuffSample: '',
  overallErrors: [],
  governmentStats: [],
  nationalNewsStats: [],
  taxSystemStats: []
}

// getters
const getters = {
  stuffSample: state => state.stuffSample,
  overallErrors: state => state.overallErrors,
  governmentStats: state => state.governmentStats,
  nationalNewsStats: state => state.nationalNewsStats,
  taxSystemStats: state => state.taxSystemStats
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
  fetchStatisticsData ({ commit, state }) {
    businessDataAPIs.getUserBehaviourStatistics().then(response => {
      if (response.status === 200) {
        commit(types.STATISTICS_DATA_FETCHED, response.data)
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
  [types.STATISTICS_DATA_FETCHED] (state, statisticsData) {
    state.overallErrors = statisticsData.overallErrors
    state.governmentStats = statisticsData.governmentStats
    state.nationalNewsStats = statisticsData.nationalNewsStats
    state.taxSystemStats = statisticsData.taxSystemStats
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
