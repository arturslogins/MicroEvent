<template>
  <div class="col-sm-12 col-md-12">
    <div :class="'card card-accent-' + logLevelToClassName(logEntry.logLevel)">
      <div class="card-header">
        <span :class="'badge float-right badge-' + logLevelToClassName(logEntry.logLevel)">{{logEntry.logLevel}}</span>
        <span class="timestamp float-right text-muted"><i class="fa fa-clock-o"></i>{{logEntry.timestamp}}</span>
        <span class="location">{{logEntry.location}}</span>
      </div>
      <div class="card-block">
        {{logEntry.contents}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log_entry',
  props: ['logEntry'],
  methods: {
    logLevelToClassName (logLevel) {
      switch (logLevel.toLowerCase()) {
        case 'error':
          return 'danger'
        case 'warning':
          return 'warning'
        case 'info':
          return 'primary'
        case 'debug':
          return 'success'
      }
    }
  }
}
</script>

<style scoped>
.timestamp {
  margin-right: 20px;
  margin-top: -4px;
}

i {
  padding: 2px;
}
</style>
