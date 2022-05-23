import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import LaunchIcon from '@material-ui/icons/Launch';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        // minWidth: '100%',
        color: theme.palette.text.secondary,
    },
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        fontSize: '1em',
        backgroundColor: theme.palette.common.black,
    },
    table: {
        width: '100%',
        border: '',
    },
    tableContract: {
        width: '70%',
        border: '',
    },
}));


export default function ContractExecutionsGrid() {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatAddr = (address) => {
        return address.slice(0, 7) + "..." + address.slice(-7)
    }

    const preventDefault = (event) => event.preventDefault();

    const classes = useStyles();
    const params = useParams();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {

        let rewardsUrl = '/api/executions/' + params.address + '/5';
        fetch(rewardsUrl)
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
        <>
        <Grid item xs={12} spacing={0}>
            <Paper square variant="outlined" className={classes.paper}> 
                <Typography variant="button" gutterBottom>
                    Last Executions:
                </Typography>

                <Table hover className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Sender</TableCell>
                            <TableCell align="right">Gas Used</TableCell>
                            <TableCell align="right">Fees</TableCell>
                            <TableCell align="right">Tx</TableCell>
                            <TableCell align="right">Block</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>    
                    {data.map((row) => (
                        <TableRow>
                            <TableCell align="right">
                                {formatAddr(row.sender)}
                            </TableCell> 
                            <TableCell align="right">
                                {row.gas_used}
                            </TableCell> 
                            <TableCell align="right">
                                {row.fees_amount}
                            </TableCell> 
                            <TableCell align="right">
                                <Link to={'/tx/'+row.tx_hash}>
                                    <LaunchIcon fontSize="small" color="Primary"/>
                                </Link>          
                            </TableCell> 
                            <TableCell align="right">
                                {row.height}
                            </TableCell>                     
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>

            
        </>
        

    );

}
