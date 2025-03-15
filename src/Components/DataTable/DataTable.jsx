import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const DataTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const DataTable = ({headers,data}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header)=>(
                <DataTableCell>{header}</DataTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
            const value = row.properties
            const quakes = [value.mag,value.dmin];
            const sort = quakes.sort();
            const mid = Math.ceil(quakes.length / 2);
            const median = quakes.length % 2 == 0 ? (sort[mid] + sort[mid - 1]) / 2 : sort[mid - 1];
              return (
                  <TableRow >
                  <TableCell component="th" scope="row">
                    {value.place}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.type}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.mag}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.dmin}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {median}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.magType}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.gap}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value.time}
                  </TableCell>
                  </TableRow>
              )
          })}
        </TableBody>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={3}
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
      </Table>
    </TableContainer>
  );
}
