import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import get from "lodash/get";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { StatesResponseData } from "Types/api/CovidAPI";

Chart.register(...registerables);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

interface IProps {
  data: StatesResponseData | undefined;
  county: string;
}

const calculateDiff = (array: number[]) => {
  const result = array.reduce(
    (acc: number[], curr: number, i: number, src: number[]) => {
      if (i !== 0) acc.push(curr - src[i - 1]);
      return acc;
    },
    []
  );
  return result;
};

const ChartSourceLink = () => {
  return (
    <div>
      <Typography variant="caption">Data Source: &nbsp;</Typography>
      <Link
        href="https://postman-toolboxes.github.io/covid-19/"
        variant="caption"
        target="_blank"
        rel="noreferrer">
        Postman COVID-19 API
      </Link>
    </div>
  );
};

export const NewCasesChart = ({ data, county }: IProps) => {
  const getCasesData = () => {
    const cases = get(data, "timeline.cases", {});
    const label = `New Cases in ${county}`;
    const labels = Object.keys(cases);
    labels.shift();
    const values = Object.keys(cases).map((key) => cases[key]);
    const chartData = calculateDiff(values);

    return {
      labels,
      datasets: [
        {
          label: label,
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
  };

  return (
    <>
      <Bar data={getCasesData()} options={options} />
      <ChartSourceLink />
    </>
  );
};

export const DeathsChart = ({ data, county }: IProps) => {
  const getDeathsData = () => {
    const deaths = get(data, "timeline.deaths", {});
    const label = `Deaths in ${county}`;
    const labels = Object.keys(deaths);
    labels.shift();
    const values = Object.keys(deaths).map((key) => deaths[key]);
    const chartData = calculateDiff(values);

    return {
      labels,
      datasets: [
        {
          label: label,
          data: chartData,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <>
      <Line data={getDeathsData()} options={options} />
      <ChartSourceLink />
    </>
  );
};
