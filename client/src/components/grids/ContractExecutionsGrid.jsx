import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';
import LaunchIcon from '@material-ui/icons/Launch';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
}));

const rowsPerPage = 50;

export default function ContractExecutionsGrid() {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    const classes = useStyles();
    const params = useParams();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        setIsLoading(true);

        fetch(`/api/executions/${params.address}?limit=${rowsPerPage}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            setHasMore(data.length >= rowsPerPage)
            setData(oldData => ([...oldData, ...data]));
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, [page]);


    return (
        <>

        {data.length == 0 && !isLoading && <div className="loading-result">No data found</div>}

        {data.length > 0 && (
            <TableContainer className={classes.container}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Datetime</TableCell>
                            <TableCell align="center">Block</TableCell>
                            <TableCell align="right">Sender</TableCell>
                            <TableCell align="right">Gas Used</TableCell>
                            <TableCell align="right">Fees</TableCell>
                            <TableCell align="center">Tx</TableCell>             
                        </TableRow>
                    </TableHead>
                    <TableBody>    
                    {data.map((row) => (
                        <TableRow hover>
                            <TableCell align="center">
                                {formatDate(row.executed_at)}
                            </TableCell> 
                            <TableCell align="center">
                                {row.height}
                            </TableCell>   
                            <TableCell align="right">
                                {minimizeStr(row.sender, 8, 12)}
                            </TableCell> 
                            <TableCell align="right">
                                {row.gas_used}
                            </TableCell> 
                            <TableCell align="right">
                                {row.fees_amount}
                            </TableCell> 
                            <TableCell align="center">
                                <Link to={'/tx/'+row.tx_hash}>
                                    <LaunchIcon fontSize="small" color="Primary"/>
                                </Link>          
                            </TableCell>                    
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        )}
        
        {isLoading && <div className="circular-progress"><CircularProgress size="4rem" /></div>} 
 
        {!isLoading && hasMore && (
            <div className="pagination">
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    onClick={() => {setPage(page + 1)}}
                >
                    Load next {rowsPerPage} rows
                </Button>
            </div>
        )}
            
        </>
        

    );

}
