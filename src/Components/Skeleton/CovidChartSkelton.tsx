import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export const CovidChartSkeleton = () => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Paper>
          <Skeleton
            variant="text"
            width="30%"
            height={20}
            style={{ marginBottom: "8px" }}
          />
          <Skeleton component="div" variant="rect" height={40} width="50%" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Skeleton component="div" variant="rect" height={300} width="100%" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Skeleton component="div" variant="rect" height={300} width="100%" />
        </Paper>
      </Grid>
    </Grid>
  );
};
