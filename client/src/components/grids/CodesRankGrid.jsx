import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';

import { DataGrid, GridToolbar } from '@material-ui/data-grid';


const columns = [
  { id: 'codeID', label: 'Code ID'},
  { id: 'type', label: 'Type'},
  { id: 'creator', label: 'Creator account'},
  { id: 'size', label: 'Size\u00a0(kb)'},
  { id: 'contractsCount', label: 'Contracts'},
  { id: 'timestamp', label: 'Stored'},
  { id: 'height', label: 'Block height'},
];

const columns_grid = [
    { field: 'codeID', headerName: 'Code ID'},
    { field: 'type', headerName: 'Type'},
    { field: 'creator', headerName: 'Creator account'},
    { field: 'size', headerName: 'Size\u00a0(kb)'},
    { field: 'contractsCount', headerName: 'Contracts'},
    { field: 'timestamp', headerName: 'Stored'},
    { field: 'height', headerName: 'Block height'},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function CodesRankGrid() {

    const classes = useStyles();

    const formatAddr = (address) => {
        return address.slice(0, 8) + "..." + address.slice(-8)
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [codes, setCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        fetch('/api/codes')
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            setCodes(data);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading data ...</div>;
    }
    return (
        <>
        {/* <ParametersBlock /> */}
  
            <Paper variant="outlined" square className={classes.root}>

            {/* <DataGrid
                rows={codes}
                columns={columns_grid}
                // pageSize={5}
                // id={Math.random()}
                getRowId={(row) => row.code_id}
                components={{
                    Toolbar: GridToolbar,
                  }}
                //   filterModel={{
                //     items: [
                //       { columnField: 'commodity', operatorValue: 'contains', value: 'rice' },
                //     ],
                //   }}
            /> */}
                
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell>
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {codes.map((item) => {
                                return (
                                <TableRow hover key={item.id}>
                                    <TableCell>
                                        {item.code_id}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="overline">
                                            Unknown
                                        </Typography>
                                    </TableCell>
                                    <TableCell>

                                        {formatAddr(item.creator)}
                                    </TableCell>
                                    <TableCell>
                                        {item.size}
                                    </TableCell>
                                    <TableCell>
                                        {item.contracts_count}
                                    </TableCell>
                                    <TableCell>
                                        {item.saved_at}
                                    </TableCell>
                                    <TableCell>
                                        {item.height}
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </>
    );
}