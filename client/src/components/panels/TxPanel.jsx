import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { LinearProgress, TableContainer } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Hidden from '@material-ui/core/Hidden';

import CopyToClipboard from '../../utils/CopyToClipboard';

import ReactJson from 'react-json-view'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    tableHead: {
        paddingTop: '10px',
        width: '100%',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
    },
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    }
}));


export default function TxPanel({ data, isLoading }) {

    // console.log('data.tx', data.tx);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    const classes = useStyles();

    return (

        <>

            {isLoading && <div className="linear-progress"><LinearProgress /></div>} 

            {!data && !isLoading && <div className="loading-result"> No data found</div>} 

            {data.tx && (
                <>

                <Grid container spacing={0}>
                    <Grid  item xs={6} sm={3} spacing={0}>             
                        <div className="tx-card">
                            <div className="tx-card-title">
                                Height
                            </div>
                            <div className="tx-card-value">{data.tx.height}</div>
                        </div> 
                    </Grid>

                    <Grid  item xs={6} sm={3} spacing={0}>             
                        <div className="tx-card">
                            <div className="tx-card-title">
                                Result
                            </div>
                            <div className="tx-card-value">
                                {data.tx.code == 0 
                                ?
                                <span className="tx-card-success-true">Ok</span>
                                :
                                <span className="tx-card-success-false">Fail</span>
                                }
                            </div>
                        </div> 
                    </Grid>

                    <Grid  item xs={6} sm={3} spacing={0}>             
                        <div className="tx-card">
                            <div className="tx-card-title">
                                Gas Used
                            </div>
                            <div className="tx-card-value">{data.tx.gasUsed}</div>
                        </div> 
                    </Grid>

                    <Grid  item xs={6} sm={3} spacing={0}>             
                        <div className="tx-card">
                            <div className="tx-card-title">
                                Gas Wanted
                            </div>
                            <div className="tx-card-value">{data.tx.gasWanted}</div>
                        </div> 
                    </Grid>
                </Grid>
                
                {data.messages && (
                    <Grid container spacing={0}>
                        <Grid  item xs={12} spacing={0}> 
                            <div className="panel">
                                <div className="panel-title">
                                    Tx Messages
                                </div>
                                
                                <TableContainer >
                                    <Table size="small">              
                                        {data.messages.map((item, i) => (  
                                            <TableBody>                                   
                                            {Object.entries(item).map(([key, value]) => (
                                                <TableRow hover >
                                                    <TableCell align="">
                                                        {key}
                                                    </TableCell> 
                                                    <TableCell align="">
                                                        {key == 'funds' && 
                                                            <>
                                                                {value[0] && <>{value[0].amount} {value[0].denom}</>}
                                                            </>
                                                        }
                                                        {key == 'msg' && <>{String.fromCharCode.apply(null, item.msg)}</>}
                                                        {key != 'funds' && key != 'msg' && <>{String(value)}</>}
                                                    </TableCell> 
                                                </TableRow>
                                            ))}  
                                            </TableBody>                           
                                        ))}                                    
                                    </Table>
                                </TableContainer>
                            </div> 
                        </Grid>
                    </Grid>
                )}

                <Grid container spacing={0}>
                    <Grid  item xs={12} spacing={0}> 
                        <div className="panel">
                            {data.tx.code == 0
                                ?
                                <>
                                <div className="panel-title">
                                    Tx Log
                                </div>
                                <ReactJson src={data.log} name="tx" />
                                </>

                                :
                                <>
                                <div className="panel-title">
                                    Error
                                </div>
                                {data.tx.rawLog}
                                <CopyToClipboard text={data.tx.rawLog} />
                                </>
                            }
                        </div> 
                    </Grid>
                </Grid>
                </>
            )}
       
        </>      
    );

}
