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
            label: 'Sales Analytics',
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
            data: [65, 59, 80, 81, 56, 55, 40, 55, 50, 80, 70, 72],
          },
          {
            label: 'Monthly Earnings',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(235, 239, 242, 0.2)',
            borderColor: '#ebeff2',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ebeff2',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#ebeff2',
            pointHoverBorderColor: '#eef0f2',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [80, 23, 56, 65, 33, 35, 85, 75, 92, 76, 90, 70],
          },
        ],
      },
      {
        defaultFontColor: '#8791af',
        responsive: true,
        maintainAspectRatio: true,
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
                max: 500,
                min: 0,
                stepSize: 20,
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