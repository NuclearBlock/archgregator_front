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

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    }
});

export default function ContractsRankGrid() {

    const classes = useStyles();

    const formatAddr = (address) => {
        return address.slice(0, 7) + "..." + address.slice(-10)
    }

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        fetch('/api/contracts/')
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
        return <div>Loading data...</div>;
    }
    
    return (
        <Paper variant="outlined" square className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Contract address
                        </TableCell>
                        <TableCell>
                            Creator
                        </TableCell>
                        <TableCell>
                            Label
                        </TableCell>

                        <TableCell>
                            Contract type
                        </TableCell>

                        <TableCell>
                            Executed
                        </TableCell>

                        <TableCell>
                            Gas Used
                        </TableCell>

                        <TableCell>
                            Fees
                        </TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .map((item) => {
                        return (
                        <TableRow hover>
                            <TableCell>
                                <Link component={RouterLink} to={"/contracts/"+item.contract_address} className={classes.link}>
                                    {formatAddr(item.contract_address)}
                                </Link>  
                            </TableCell>
                            <TableCell>
                                {formatAddr(item.creator)}
                            </TableCell>
                            <TableCell>
                                {item.label}
                            </TableCell>
                            <TableCell>
                                UNKNOWN
                            </TableCell>
                            <TableCell>
                                {item.executed}
                            </TableCell>
                            <TableCell>
                                {item.gas_used}
                            </TableCell>
                            <TableCell>
                                {item.fees} utorii
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