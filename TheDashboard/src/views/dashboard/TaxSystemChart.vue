<script>
import { Line } from 'vue-chartjs'
import { mapGetters } from 'vuex'

const brandPrimary = '#20a8d8'

export default Line.extend({
  props: ['height'],
  computed: mapGetters({
    taxSystemStats: 'taxSystemStats'
  }),
  data () {
    return {
      receivedDataFirstTime: false
    }
  },
  mounted () {
    this.render(this.taxSystemStats, 1000)
  },
  watch: {
    taxSystemStats: function (values) {
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
    render (taxSystemStats, durationAnimation) {
      this.renderChart({
        labels: taxSystemStats.labels,
        datasets: [
          {
            label: 'Users',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: taxSystemStats.data
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
              min: Math.min.apply(Math, taxSystemStats.data) - 5,
              max: Math.max.apply(Math, taxSystemStats.data) + 5
            }
          }]
        },
        elements: {
          line: {
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
