import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Chip from '@material-ui/core/Chip';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Switch from '@material-ui/core/Switch';
import LaunchIcon from '@material-ui/icons/Launch';
import VisibilityIcon from '@material-ui/icons/Visibility';

import ContractInfoChart from '../charts/ContractInfoChart'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ComtractInfoPanel({ info, summary, isLoading }) {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    return (
        <div className="panel">
   
            <Grid container spacing={0}>

                <Grid item sm={6} spacing={0} >

                    <div className='panel-title'>
                        Contract Info
                    </div>
                    
                    {/* {isLoading && <div class="dashboard-progress"><CircularProgress size="4rem" /></div>}  */}
            
                    {info.length == 0 && <div> No data found</div>} 

                    {info.length > 0 && (
                    <Table size="small">
                        <TableBody>                 
                            {info.map((item, i) =>
                                <>
                                    {item.label != ''
                                        ?<TableRow >
                                            <TableCell width="40%">
                                                Label:
                                            </TableCell>
                                            <TableCell align="left">
                                                <Chip
                                                    size="small"
                                                    label={item.label}
                                                    color="primary"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        : null
                                    }
                                
                                    <TableRow>
                                        <TableCell width="40%">
                                            <Hidden xsDown >Wasm</Hidden> code used:
                                        </TableCell>
                                        <TableCell align="left">
                                            #{item.code_id}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Creator <Hidden xsDown >address:</Hidden>
                                        </TableCell>
                                        <TableCell align="left">
                                            {minimizeStr(item.creator, 8, 16)}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Admin <Hidden xsDown >address:</Hidden>
                                        </TableCell>
                                        <TableCell align="left">
                                            {minimizeStr(item.admin, 8, 16)}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Instantiated:
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatDate(item.instantiated_at)}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Block:
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.height}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Tx:
                                        </TableCell>
                                        <TableCell align="left">
                                            <Hidden xsDown >
                                                {minimizeStr(item.tx_hash, 15, 15)}
                                            </Hidden> 
                                            <Hidden smUp >
                                                {minimizeStr(item.tx_hash)}
                                            </Hidden>    
                                            &nbsp;
                                            <Link to={'/tx/'+item.tx_hash}>
                                                <LaunchIcon fontSize="small" color="Primary"/>
                                            </Link>  
                                        </TableCell>
                                    </TableRow>
                                    
                                    {/* <TableRow>
                                        <TableCell width="40%">
                                            RAW Message:
                                        </TableCell>
                                        <TableCell align="left">
                                            <VisibilityIcon fontSize="small" color="Primary"/>
                                        </TableCell>
                                    </TableRow>  */}

                                </>
                            )[0]}

                        </TableBody>
                    </Table>
                    )}

                </Grid>

                <Grid  item sm={6} spacing={0} >

                    <div className='panel-title'>
                        &nbsp;
                    </div>
                    
                    {summary.length > 0 && (

                    <Grid container spacing={0}>

                        <Grid item xs={6} sm={7} spacing={0} >
                            <div className='contract-card'>
                                <div className='label'>
                                    Total executions
                                </div>
                                <div class="value">
                                    {summary[0].total_executed || "---"}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={6} sm={5} spacing={0} >
                            <div className='contract-card'>
                                <div className='label'>
                                    Unique Executors
                                </div>
                                <div class="value">
                                {summary[0].unique_executors || "---"}
                                </div>
                            </div>
                        </Grid>

                    

                        <Grid item xs={6} sm={7} spacing={0} >
                            <div className='contract-card'>
                                <div className='label'>
                                    Rewards Earned
                                </div>
                                <div class="value">
                                    {summary[0].rewards_earned || "---"}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={6} sm={5} spacing={0} >
                            <div className='contract-card'>
                                <div className='label'>
                                    Subsidized Fees
                                </div>
                                <div class="value">
                                    {summary[0].subsidized_fees || "---"}
                                </div>
                            </div>
                        </Grid>

                    </Grid>

                    )}

                    <Grid container spacing={0}>
                        
                        <Grid item sm={12} spacing={0} >
                            <Hidden xsDown >
                                <ContractInfoChart />
                            </Hidden>    
                        </Grid>

                    </Grid>

                </Grid>

            </Grid> 

        </div>       
    );

}
