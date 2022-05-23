import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { id: 'contract_address', label: 'Contract address'},
  { id: 'label', label: 'Label'},
  { id: 'executed', label: 'Executed'},
  { id: 'gas_used', label: 'Gas used'},
  { id: 'fees', label: 'Fees'},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ContractsRanking() {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        fetch('/api/contracts')
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            setData(data);
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
        return <div><CircularProgress /></div>;
    }
    return (
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data
                .map((item) => {
                    return (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Link component={RouterLink} to={item.contract_address}>
                                {item.contract_address}
                            </Link>    
                        </TableCell>
                        <TableCell>
                            {item.label}
                        </TableCell>
                        <TableCell>
                            {item.executed}
                        </TableCell>
                        <TableCell>
                            {item.gas_used}
                        </TableCell>
                        <TableCell>
                            {item.fees}
                        </TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
}