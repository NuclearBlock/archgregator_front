import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';
import LaunchIcon from '@material-ui/icons/Launch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const rowsPerPage = 50;

export default function CodesRankGrid() {

    const classes = useStyles();

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k)); 
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const params = useParams();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        setIsLoading(true);

        fetch(`/api/codes?limit=${rowsPerPage}&page=${page}`)
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
                    <Table size="small">
                        <TableHead>
                            <TableRow>

                                <TableCell align="center">
                                    Code ID
                                </TableCell>

                                <TableCell align="right">
                                    Type
                                </TableCell>

                                <TableCell align="right">
                                    Creator
                                </TableCell>

                                <TableCell align="right">
                                    Size (Kb)
                                </TableCell>

                                {/* <TableCell align="center">
                                    Contracts
                                </TableCell> */}

                                <TableCell align="right">
                                    Stored
                                </TableCell>

                                <TableCell align="center">
                                    Block
                                </TableCell>

                                <TableCell align="center">
                                    <MoreHorizIcon fontSize="small" /> 
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((item) => {
                                return (
                                <TableRow hover key={item.id}>
                                    <TableCell align="center">
                                        {item.code_id}
                                    </TableCell>

                                    <TableCell  align="right">
                                        Unknown
                                    </TableCell>

                                    <TableCell  align="right">
                                        {minimizeStr(item.creator, 8, 12)}
                                    </TableCell>

                                    <TableCell align="right">
                                        {formatBytes(item.size)}
                                    </TableCell>

                                    {/* <TableCell align="center">
                                        {item.contracts_count}
                                    </TableCell> */}

                                    <TableCell align="right">
                                        {formatDate(item.saved_at)}
                                    </TableCell>

                                    <TableCell align="center">
                                        {item.height}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Link to={'/codes/'+item.code_id}>
                                            <LaunchIcon fontSize="small" color="Primary"/>
                                        </Link>          
                                    </TableCell> 
                                </TableRow>
                                );
                            })}
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