<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default Bar.extend({
  props: ['height'],

  computed: mapGetters({
    overallErrors: 'overallErrors'
  }),
  mounted () {
    this.$store.dispatch('fetchOverallErrors')
    this.render(this.overallErrors)
  },
  updated () {
    this.render(this.overallErrors)
  },
  watch: {
    overallErrors: function (values) {
      this.render(values)
    }
  },
  methods: {
    render (overallErrors) {
      this.renderChart({
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Overall Errors',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: overallErrors
          }
        ]
      }, {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            categoryPercentage: 1,
            barPercentage: 0.5
          }],
          yAxes: [{
            display: false
          }]
        }
      })
    }
  }
})
</script>
