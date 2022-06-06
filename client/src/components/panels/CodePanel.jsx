import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { LinearProgress } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Hidden from '@material-ui/core/Hidden';

import CopyToClipboard from '../../utils/CopyToClipboard';


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


export default function CodePanel({ data, isLoading }) {

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

    const classes = useStyles();

    return (

        <div className="panel">
   
            <div className="panel-title">
                Wasm Code Details
            </div>

            {isLoading && <div className="linear-progress"><LinearProgress /></div>} 

            {data.length == 0 && <div className="loading-result"> No data found</div>} 

            {data.length > 0 && (

            <Table size="small">

                <TableBody>

                    <TableRow>
                        <TableCell width="40%">
                            Code ID:
                        </TableCell>
                        <TableCell align="left">
                            {data[0].code_id}
                        </TableCell>
                    </TableRow>
            
                    <TableRow>
                        <TableCell width="40%">
                            Creator:
                        </TableCell>
                        <TableCell align="left">       
                            <Hidden xsDown >
                                {data[0].creator}
                            </Hidden> 
                            <Hidden smUp >
                                {minimizeStr(data[0].creator)}
                            </Hidden> 
                            <CopyToClipboard textToCopy={data[0].creator} /> 
                        </TableCell>
                    </TableRow>

                    {data[0].admin &&
                        <TableRow>
                            <TableCell width="40%">
                                Admin:
                            </TableCell>
                            <TableCell align="left">
                                <Hidden xsDown >
                                    {data[0].admin}
                                </Hidden> 
                                <Hidden smUp >
                                    {minimizeStr(data[0].admin)}
                                </Hidden> 
                                <CopyToClipboard textToCopy={data[0].admin} /> 
                            </TableCell>
                        </TableRow>
                    }

                    <TableRow>
                        <TableCell width="40%">
                            Size:
                        </TableCell>
                        <TableCell align="left">
                            {formatBytes(data[0].size)}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell width="40%">
                            <Hidden xsDown >WASM </Hidden>Code hash:
                        </TableCell>
                        <TableCell align="left">         
                            <Hidden xsDown >
                                {data[0].code_hash}
                            </Hidden> 
                            <Hidden smUp >
                                {minimizeStr(data[0].code_hash)}
                            </Hidden> 
                            <CopyToClipboard textToCopy={data[0].code_hash} /> 
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell width="40%">
                            Stored:
                        </TableCell>
                        <TableCell align="left">
                            {formatDate(data[0].saved_at)}
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell width="40%">
                            Block:
                        </TableCell>
                        <TableCell align="left">
                            {data[0].height}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell width="40%">
                            Tx:
                        </TableCell>
                        <TableCell align="left">
                            <Link to={'/tx/'+data[0].tx_hash} className={classes.link}>
                                <Hidden xsDown >
                                    {data[0].tx_hash}
                                </Hidden> 
                                <Hidden smUp >
                                    {minimizeStr(data[0].tx_hash)}
                                </Hidden>    
                            </Link> 
                            <CopyToClipboard textToCopy={data[0].tx_hash} />     
                        </TableCell> 
                    </TableRow>

                </TableBody>
  
            </Table>

            )}
       
        </div>       
    );

}
