import Vue from 'vue'
import Vuex from 'vuex'
import modStatistics from './modules/mod_statistics'
import modLogs from './modules/mod_logs'
import modMonitoring from './modules/mod_monitoring'
import modOpsChat from './modules/mod_opschat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modStatistics,
    modLogs,
    modMonitoring,
    modOpsChat
  }
})
