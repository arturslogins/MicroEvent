<script>
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['height', 'nationalNewsStats'],
  data () {
    return {
      receivedDataFirstTime: false
    }
  },
  mounted () {
    this.render(this.nationalNewsStats, 1000)
  },
  watch: {
    nationalNewsStats: function (values) {
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
    render (nationalNewsStats, durationAnimation) {
      this.renderChart({
        labels: nationalNewsStats.labels,
        datasets: [
          {
            label: 'Users',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: nationalNewsStats.data
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
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      })
    }
  }
})
</script>
