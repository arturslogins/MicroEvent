import Vue from 'vue'
import Vuex from 'vuex'
import modBusinessData from './modules/mod_businessdata'
import modLogs from './modules/mod_logs'
import modMonitoring from './modules/mod_monitoring'
import modOpsChat from './modules/mod_opschat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modBusinessData,
    modLogs,
    modMonitoring,
    modOpsChat
  }
})
