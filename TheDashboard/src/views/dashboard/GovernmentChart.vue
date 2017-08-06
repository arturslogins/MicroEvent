<script>
import { Line } from 'vue-chartjs'

const brandInfo = '#63c2de'

export default Line.extend({
  props: ['height', 'governmentStats'],
  mounted () {
    this.render(this.governmentStats, 1000)
  },
  data () {
    return {
      receivedDataFirstTime: false
    }
  },
  watch: {
    governmentStats: function (values) {
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
    render (governmentStats, durationAnimation) {
      this.renderChart({
        labels: governmentStats.labels,
        datasets: [
          {
            label: 'Users',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: governmentStats.data
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
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }

          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, governmentStats.data) - 5,
              max: Math.max.apply(Math, governmentStats.data) + 5
            }
          }]
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      })
    }
  }
})
</script>
