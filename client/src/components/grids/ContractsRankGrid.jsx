import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LaunchIcon from '@material-ui/icons/Launch';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    },
    cell: {
        width: '10px',
    },
    tableContainer: {
        margin: '.3rem',
        padding: '10px',
        width: 'inherit',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        // boxShadow: '0 .3rem .6rem 0 rgba(0,0,0,.16)',
    },
});

const rowsPerPage = 50;

export default function ContractsRankGrid() {

    const classes = useStyles();

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    const params = useParams();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        setIsLoading(true);

        fetch(`/api/contracts/?limit=${rowsPerPage}&page=${page}`)
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

            {!data.length && !isLoading && <div className="loading-result">No data found</div>}

            {data.length > 0 && (  

                <TableContainer className={classes.tableContainer}>
                    <Table size="small">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center" className={classes.cell}>
                                #
                            </TableCell>

                            <TableCell>
                                Contract address
                            </TableCell>

                            <TableCell>
                                Creator
                            </TableCell>

                            <TableCell>
                                Label
                            </TableCell>

                            {/* <TableCell>
                                Contract type
                            </TableCell> */}

                            <TableCell align="center">
                                Executed
                            </TableCell>

                            <TableCell align="center">
                                Gas Used
                            </TableCell>

                            <TableCell>
                                Fees Used
                            </TableCell>

                            <TableCell align="center">
                                <MoreHorizIcon fontSize="small" />  
                            </TableCell>  
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                        .map((item, i) => {
                            return (
                            <TableRow hover>
                                <TableCell align="center">
                                    {i+1}
                                </TableCell>

                                <TableCell>
                                    <Link to={"/contracts/"+item.contract_address} className={classes.link}>
                                        {minimizeStr(item.contract_address)}
                                    </Link>  
                                </TableCell>

                                <TableCell>
                                    {minimizeStr(item.creator)}
                                </TableCell>

                                <TableCell>
                                    {item.label}
                                </TableCell>

                                {/* <TableCell>
                                    UNKNOWN
                                </TableCell> */}

                                <TableCell align="center">
                                    {item.executed}
                                </TableCell>

                                <TableCell align="center">
                                    {item.gas_used}
                                </TableCell>

                                <TableCell>
                                    {item.fees?item.fees:0} utorii
                                </TableCell>

                                <TableCell align="center">
                                    <Link to={'/contracts/'+item.contract_address}>
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