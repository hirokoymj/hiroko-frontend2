import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Typography from "@material-ui/core/Typography";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Paper from "@material-ui/core/Paper";

import { ChartSourceLink } from "Components/Chart/ChartSourceLink";
import { IChartMappedData } from "Containers/CovidChartTotalView";

Chart.register(...registerables);

interface IProps {
  data: IChartMappedData;
}

export const CovidChartHorizontal = ({ data }: IProps) => {
  const { chartData, chartLabels, chartUpdated } = data;

  const finalData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total covid cases",
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        align: "end" as const,
        anchor: "end" as const,
        formatter: function (value: number) {
          return value.toLocaleString("en-US");
        },
      },
    },
    scales: {
      x: {
        max: 10000000,
      },
    },
  };

  return (
    <Paper style={{ height: "2200px" }}>
      <Typography variant="h6" gutterBottom component="div">
        As of {chartUpdated}
      </Typography>
      <Bar data={finalData} options={options} plugins={[ChartDataLabels]} />
      <ChartSourceLink />
    </Paper>
  );
};
