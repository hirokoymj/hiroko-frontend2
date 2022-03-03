import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export const ChartSourceLink = () => {
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
