import React from "react";
import { default as MuiTable } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

export const Table = ({ tableTitle, data, colmuns, loading }) => {
  return (
    <Container maxWidth="md">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {tableTitle && <h1>{tableTitle}</h1>}
          <TableContainer component={Paper}>
            <MuiTable aria-label="simple table">
              <TableHead>
                <TableRow>
                  {colmuns.map((col) => {
                    return <TableCell key={col.field}>{col.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, index) => {
                  return (
                    <TableRow key={index}>
                      {colmuns.map((col, index) => {
                        return (
                          <TableCell component="th" scope="row" key={index}>
                            {d[col.field]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </div>
      )}
    </Container>
  );
};
