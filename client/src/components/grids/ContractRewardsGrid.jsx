import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
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
import LaunchIcon from '@material-ui/icons/Launch';


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

    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        setData(false);
        setIsLoading(true);
        
        let apiUrl ='/api/rewards/' + params.address + '?limit=100';
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

    return (

        <>
        {isLoading && <div className="circular-progress"><CircularProgress size="4rem" /></div>} 
        
        {data.length == 0 && <div className="loading-result">No data found</div>} 
        
        {data.length > 0 && (

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Date
                        </TableCell> 

                        <TableCell align="right">
                            Block
                        </TableCell>

                        {/* <TableCell>
                            Calculated Rewards
                        </TableCell> 

                        <TableCell>
                            Inflation Rewards
                        </TableCell>   */}

                        <TableCell align="right">
                            Distributed Amount
                        </TableCell> 

                        {/* <TableCell>
                            Leftover Amount
                        </TableCell>  */}

                        <TableCell align="center">
                            Details
                        </TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .map((item, i) => {
                        return (
                        <TableRow key={i}>
                            <TableCell align="center">
                                {formatDate(item.reward_date)}
                            </TableCell>
                            <TableCell align="right">
                                {item.height}
                            </TableCell>
                            {/* <TableCell>
                                {item.contract_rewards_amount.toFixed(2)} utorii
                            </TableCell>
                            <TableCell>
                                {item.inflation_rewards_amount.toFixed(2)} utorii
                            </TableCell> */}
                            <TableCell align="right">
                                {item.distributed_rewards_amount} utorii
                            </TableCell>

                            {/* <TableCell>
                                {item.leftover_rewards_amount.toFixed(2)} utorii
                            </TableCell> */}

                            <TableCell align="center">
                                <Link to={'/rewards/'+item.contract_address+'/'+item.height}>
                                    See details&nbsp;<LaunchIcon fontSize="inherit"/>
                                </Link>
                            </TableCell>

                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>

        )}
        </>
    );
}