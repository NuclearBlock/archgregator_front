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
import LaunchIcon from '@material-ui/icons/Launch';
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
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    }
}));


export default function ComtractMetadataPanel({ data, isLoading }) {

    const classes = useStyles();

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    return (

        <div className="panel">
   
            <div className="panel-title">
                Metadata Settings
            </div>

            {isLoading && <div className="linear-progress"><LinearProgress /></div>} 

            {data.length == 0 && <div className="loading-result"> No metadata found</div>} 

            {data.length > 0 && (

            <Table size="small">
                <TableBody>

                    {data.map((item, i) =>
                        <>

                            <TableRow>
                                <TableCell width="40%">
                                    <Hidden xsDown >Metadata </Hidden>Saved:
                                </TableCell>
                                <TableCell align="left">
                                    {formatDate(item.saved_at)}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    Developer<Hidden xsDown > address</Hidden>:
                                </TableCell>
                                <TableCell align="left">
                                    <Hidden xsDown >
                                        {item.developer_address}             
                                    </Hidden> 
                                    <Hidden smUp >
                                        {minimizeStr(item.developer_address, 12, 12)}
                                    </Hidden> 
                                    <CopyToClipboard textToCopy={item.developer_address} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Rewards address:
                                </TableCell>
                                <TableCell align="left">
                                    {/* {minimizeStr(item.reward_address)} */}
                                    <Hidden xsDown >
                                        {item.reward_address}
                                    </Hidden> 
                                    <Hidden smUp >                         
                                        {minimizeStr(item.reward_address, 12, 12)}
                                    </Hidden> 
                                    <CopyToClipboard textToCopy={item.reward_address} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    <Hidden xsDown >Collect </Hidden>Premium:
                                </TableCell>
                                <TableCell align="left">
                                    <Switch
                                        checked={item.collect_premium}
                                        color="primary"
                                        name="checkedB"
                                        size="small"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    <Hidden xsDown >Premium percentage charge</Hidden> (%):
                                </TableCell>
                                <TableCell align="left">
                                    {item.premium_percentage_charged}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    Gas<Hidden xsDown > Rebate</Hidden> to User:
                                </TableCell>
                                <TableCell align="left">
                                    <Switch
                                        checked={item.gas_rebate_to_user}
                                        color="primary"
                                        name="checkedB"
                                        size="small"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    <Hidden xsDown >Metadata </Hidden>Transaction:
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={'/tx/'+item.tx_hash} className={classes.link}>
                                        <Hidden xsDown >
                                            {item.tx_hash}             
                                        </Hidden> 
                                        <Hidden smUp >
                                            {minimizeStr(item.tx_hash, 10, 10)}
                                        </Hidden>  
                                        {/* <LaunchIcon fontSize="inherit" color="Primary"/> */}
                                    </Link> 
                                    <CopyToClipboard textToCopy={item.tx_hash} />
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


                        </>
                    )[0]}

                </TableBody>
            </Table>

            )}
       
        </div>       
    );

}
