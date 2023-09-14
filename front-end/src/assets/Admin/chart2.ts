// chart 2
import Chart from 'chart.js/auto'
export const chart2 = (canvas, dataLabel, type) => {
console.log(canvas,dataLabel,type,'///////chart2');

  const ctx2 = canvas.getContext('2d');

  console.log(dataLabel, type, '////insideuser');


  var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
  gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

  var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
  gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradientStroke2.addColorStop(0, "rgba(20,23,39,0)"); //purple colors
  let labels = []
  let dataLabels = []
  if (type == 'month') {
    dataLabels = [dataLabel[0]?.users, dataLabel[1]?.users, dataLabel[2]?.users, dataLabel[3]?.users, dataLabel[4]?.users, dataLabel[5]?.users, dataLabel[6]?.users, dataLabel[7]?.users, dataLabel[8]?.users, dataLabel[9]?.users, dataLabel[10]?.users, dataLabel[11]?.users,]
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  } else if (type == 'testMonth') {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    dataLabel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  } else if (type == 'testWeek') {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    dataLabel = [0, 0, 0, 0, 0, 0, 0]
  } else if (type == 'week') {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    dataLabels = [dataLabel[0], dataLabel[1], dataLabel[2], dataLabel[3], dataLabel[4], dataLabel[5], dataLabel[6]]
  } else if (type == 'testYear') {
    labels = ['2018', '2019', '2020', '2021', '2022', '2023']
    dataLabel = [0, 0, 0, 0, 0, 0,]
  } else if (type == 'year') {
    console.log(dataLabel[2023],'yeaaaaaaaaaaaaaaa');
    
    labels = ['2018', '2019', '2020', '2021', '2022', '2023']
    dataLabels = [dataLabel[2018], dataLabel[2019], dataLabel[2020], dataLabel[2021], dataLabel[2022], dataLabel[2023]]
  }

  console.log(dataLabel, 'data');

  return new Chart(ctx2, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Users",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#cb0c9f",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: dataLabels,
          maxBarThickness: 6,
        }/* ,
        {
          label: "Websites",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#3A416F",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
          maxBarThickness: 6,
        }, */
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#b2b9bf",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#b2b9bf",
            padding: 20,
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });
}
// end chart 2
