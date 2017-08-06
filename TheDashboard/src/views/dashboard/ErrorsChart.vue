<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default Bar.extend({
  props: ['height'],
  computed: mapGetters({
    overallErrors: 'overallErrors'
  }),
  data () {
    return {
      receivedDataFirstTime: false
    }
  },
  mounted () {
    this.render(this.overallErrors, 1000)
  },
  watch: {
    overallErrors: function (values) {
      if (this.receivedDataFirstTime) {
        this.render(values, 0)
      } else {
        this.render(values, 1000)
      }

      if (values.data.length > 0) {
        this.receivedDataFirstTime = true
      }
    }
  },
  methods: {
    render (overallErrors, durationAnimation) {
      this.renderChart({
        labels: overallErrors.labels,
        datasets: [
          {
            label: 'Overall Errors',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: overallErrors.data
          }
        ]
      }, {
        animation: {
          duration: durationAnimation
        },
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
