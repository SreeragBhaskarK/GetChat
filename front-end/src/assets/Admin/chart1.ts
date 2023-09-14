// chart 1
import Chart from 'chart.js/auto'
export const chart1 = (canvas, dataLabel, type) => {
  console.log(canvas, dataLabel, type,'test');

  const ctx = canvas.getContext('2d');
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
    console.log(dataLabel[2023], 'yeaaaaaaaaaaaaaaa');

    labels = ['2018', '2019', '2020', '2021', '2022', '2023']
    dataLabels = [dataLabel[2018], dataLabel[2019], dataLabel[2020], dataLabel[2021], dataLabel[2022], dataLabel[2023]]
  }
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Sales",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#fff",
          data: dataLabels,
          maxBarThickness: 6,
        },
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
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 600,
            beginAtZero: true,
            padding: 15,
            font: {
              size: 14,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
            color: "#fff",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });
}

// end chart 1
