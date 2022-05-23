import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
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
});

export default function ContractsRewardGrid() {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const classes = useStyles();
    const params = useParams();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        let apiUrl ='/api/rewards/' + params.address + '/100';
        fetch(apiUrl)
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
        <Paper variant="outlined" square className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Date
                        </TableCell> 

                        <TableCell>
                            Block
                        </TableCell>

                        <TableCell>
                            Calculated Rewards
                        </TableCell> 

                        <TableCell>
                            Inflation Rewards
                        </TableCell>  

                        <TableCell>
                            Distributed Rewards
                        </TableCell> 

                        <TableCell>
                            Leftover Amount
                        </TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .map((item, i) => {
                        return (
                        <TableRow key={i}>
                            <TableCell>
                                {formatDate(item.reward_date)}
                            </TableCell>
                            <TableCell>
                                {item.height}
                            </TableCell>
                            <TableCell>
                                {item.contract_rewards_amount.toFixed(2)} utorii
                            </TableCell>
                            <TableCell>
                                {item.inflation_rewards_amount.toFixed(2)} utorii
                            </TableCell>
                            <TableCell>
                                {item.distributed_rewards_amount.toFixed(2)} utorii
                            </TableCell>

                            <TableCell>
                                {item.leftover_rewards_amount.toFixed(2)} utorii
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