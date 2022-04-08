import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { ChartSourceLink } from "Components/Chart/ChartSourceLink";
import { IChartData } from "Types/api/CovidAPI";

Chart.register(...registerables);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

interface IProps {
  data: IChartData;
}

export const NewCasesChart = ({ data }: IProps) => {
  const { chartData, chartLabels, chartLabel } = data;

  const finalData = {
    labels: chartLabels,
    datasets: [
      {
        label: chartLabel,
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Bar data={finalData} options={options} />
      <ChartSourceLink />
    </>
  );
};

export const DeathsChart = ({ data }: IProps) => {
  const { chartData, chartLabels, chartLabel } = data;

  const finalData = {
    labels: chartLabels,
    datasets: [
      {
        label: chartLabel,
        data: chartData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Line data={finalData} options={options} />
      <ChartSourceLink />
    </>
  );
};
