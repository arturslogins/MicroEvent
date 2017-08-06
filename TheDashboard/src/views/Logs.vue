<template>
  <div class="animated fadeIn">
    <div class="row">
      <LogEntry v-for="log in logs" :logEntry="log" :key="log.id"/>
    </div><!--/.row-->
  </div>
</template>

<script>
import LogEntry from './logs/LogEntry'
import { mapGetters } from 'vuex'

export default {
  name: 'cards',
  components: {
    LogEntry
  },
  computed: {
    ...mapGetters({
      logs: 'logs'
    })
  },
  created () {
    this.$store.dispatch('fetchLogs')
    this.interval = setInterval(() => {
      this.$store.dispatch('fetchLogs')
    }, 3000)
  }
}
/* eslint-disable */
//////////////////////////////////////////////////////////
// TODO: Add code to correctly serve paginated contents //
//////////////////////////////////////////////////////////
/* eslint-enable */
</script>
