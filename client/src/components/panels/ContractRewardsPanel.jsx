import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        // minWidth: '100%',
        marginBottom: '8px',
        color: theme.palette.text.secondary,
    },
}));

export default function ParametersBlock() {


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
        let apiUrl = '/api/rewards/' + params.address + '/5';
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
        return <div>Loading data...</div>;
    }

    return (

        <Paper square variant="outlined" className={classes.paper}>
            <Typography variant="button" gutterBottom>
                Last Rewards:
            </Typography>   

            <Table className={classes.table} size="small" aria-label="sticky table">
                <TableHead>
                    <TableRow size='small'>
                      <TableCell>
                         Date
                      </TableCell>
                      <TableCell>
                        Rewarded
                      </TableCell>
                      <TableCell align="right">
                        Block
                      </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .map((item, i) => {
                        return (
                        <TableRow key={item.id}>
                            <TableCell>
                                {formatDate(item.reward_date)}
                            </TableCell>
                            <TableCell>
                                {item.contract_rewards_amount.toFixed(2)} utorii
                            </TableCell>
                            <TableCell align="right">
                                {item.height}
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>

            </Table>

            <div className='dashboard-see-more'>
                <Link to={'/rewards/'+params.address}>See all rewards&nbsp;<LaunchIcon fontSize="small"/></Link>
            </div>

        </Paper>
        
    );
}
