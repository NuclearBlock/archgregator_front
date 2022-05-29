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


export default function ContractExecutionsPanel({ data, isLoading }) {

    const params = useParams();

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    return (

        <div className='panel heigh100'>

            <div className='panel-title'>
                Last Executions:
            </div>   

            <Table size="small" aria-label="a dense table">
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
                    <TableRow hover >
                        <TableCell align="right">
                            {minimizeStr(row.sender)}
                        </TableCell> 
                        <TableCell align="right">
                            {row.gas_used}
                        </TableCell> 
                        <TableCell align="right">
                            {row.fees_amount}
                        </TableCell> 
                        <TableCell align="right">
                            <Link to={'/tx/'+row.tx_hash}>
                                <LaunchIcon fontSize="inherit" color="Primary"/>
                            </Link>          
                        </TableCell> 
                        <TableCell align="right">
                            {row.height}
                        </TableCell>                     
                    </TableRow>
                ))}
                </TableBody>
            </Table>

        </div>
        
    );
}
