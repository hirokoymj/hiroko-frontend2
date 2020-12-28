import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
// import map from "lodash/map";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";

import { TASKS } from "Queries/Task";
// import { Table } from "Components/Tables/Table";
// import { Title } from "Components/Titles/Title";

export const TaskTable = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = React.useState(0);
  const [setRowsPerPage] = React.useState(5);

  const { data, loading, error, fetchMore } = useQuery(TASKS, {
    variables: {
      cursor: null,
      limit: 5,
    },
  });
  const tasks = !loading && get(data, "tasks.taskFeed", []);
  const pageInfo = !loading && get(data, "tasks.pageInfo", {});
  const totalCount = !loading && get(data, "tasks.totalCount", {});

  const { endCursor, hasNextPage } = pageInfo;
  // const mappedData = map(tasks, (task) => {
  //   const { id, name, completed } = task;
  //   return {
  //     id,
  //     name,
  //     completed: completed ? "completed" : "not completed",
  //   };
  // });

  const handleChangePage = (event, newPage) => {
    console.log("currentPage:", page);
    console.log("newPage", newPage);
    setPage(newPage);
    const isNext = newPage > page ? true : false;
    console.log("isNext", isNext);
    if (!loading && !error) {
      if (hasNextPage) {
        setIsLoadingMore(true);
        fetchMore({
          variables: { cursor: endCursor, limit: 5 },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            console.log(prevResult);

            const prevDataFeed = get(prevResult, "tasks.taskFeed");
            const prevPageInfo = get(prevResult, "tasks.pageInfo");

            const nextDataFeed = get(fetchMoreResult, "tasks.taskFeed");
            const nextPageInfo = get(fetchMoreResult, "tasks.pageInfo");

            console.log("prevResult===", JSON.stringify(prevDataFeed));
            console.log("nextDataFeed===", JSON.stringify(nextDataFeed));

            // console.log("nextPageInfo===", JSON.stringify(nextPageInfo));

            fetchMoreResult.tasks.taskFeed = isNext
              ? [...nextDataFeed]
              : [...prevDataFeed];
            fetchMoreResult.tasks.pageInfo = isNext
              ? nextPageInfo
              : prevPageInfo;
            console.log("FINAL===");
            console.log(fetchMoreResult);
            return fetchMoreResult;
          },
        });
        setIsLoadingMore(false);
      }
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <ul>
            {tasks.map(({ id, name }) => {
              return <li key={id}>{name}</li>;
            })}
          </ul>
          <Button
            onClick={() => {
              if (hasNextPage) {
                setIsLoadingMore(true);
                fetchMore({
                  variables: { cursor: endCursor, limit: 5 },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.tasks.taskFeed = [
                      ...prevResult.tasks.taskFeed,
                      ...fetchMoreResult.tasks.taskFeed,
                    ];
                    return fetchMoreResult;
                  },
                });
                setIsLoadingMore(false);
              }
            }}
            variant="contained"
            color="primary"
            disabled={endCursor === null ? true : false}
          >
            {isLoadingMore ? "loading" : "Loard More"}
          </Button>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={5}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
};
