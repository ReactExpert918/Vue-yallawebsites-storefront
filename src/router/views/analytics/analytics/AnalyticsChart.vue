<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Website Traffic',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(85, 110, 230, 0.2)',
            borderColor: '#556ee6',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#556ee6',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#556ee6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80, 81, 80],
          }
        ],
      },
      {
        defaultFontColor: '#8791af',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                max: 100,
                min: 20,
                stepSize: 10,
              },
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)',
              },
            },
          ],
        },
      }
    )
  },
}
</script>