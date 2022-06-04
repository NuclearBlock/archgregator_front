import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { LinearProgress } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import LaunchIcon from '@material-ui/icons/Launch';
import Hidden from '@material-ui/core/Hidden';

import TimelineIcon from '@material-ui/icons/Timeline';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    accordion: {
        border: 'none',
        boxShadow: 'none',
    },
    accordionSummary: {
        color: '#f1592a',
        textTransform: 'uppercase',
        fontSize: '0.9rem',
    },
    accordionTable: {
        fontSize: '0.7rem',
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
                                    {item.developer_address && <CopyToClipboard textToCopy={item.developer_address} />}
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
                                    {item.reward_address && <CopyToClipboard textToCopy={item.reward_address} />}
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
       
            {data.length > 1 &&

                <Accordion square className={classes.accordion} >
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="metadata-history-header"
                    className={classes.accordionSummary}
                    >
                        <TimelineIcon fontSize="small" />&nbsp;Metadata history
                    </AccordionSummary>

                    <AccordionDetails>
                        <TableContainer className={classes.container}>
                        <Table size="small" className={classes.accordionTable}>
                            <TableHead>
                                <TableRow hover size='small'>
                                    <TableCell align="right">
                                        Block
                                    </TableCell>
                                    <TableCell align="right">
                                        Datetme
                                    </TableCell>
                                    <TableCell align="right">
                                        Developer
                                    </TableCell>
                                    <TableCell align="right">
                                        Reward address
                                    </TableCell>
                                    <TableCell align="center">
                                        Premium
                                    </TableCell>
                                    <TableCell align="center">
                                        Rebate to user
                                    </TableCell>
                                    <TableCell align="center">
                                        Tx
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(1).map((item, i) =>
                                    
                                    <TableRow hover size='small'>
                                        <TableCell align="right">
                                            {item.height}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatDate(item.saved_at)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {minimizeStr(item.developer_address)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {minimizeStr(item.reward_address)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={item.collect_premium}
                                                color="primary"
                                                name="checkedB"
                                                size="small"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            {item.premium_percentage_charged && ' (' + item.premium_percentage_charged + '%)'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={item.gas_rebate_to_user}
                                                color="primary"
                                                name="checkedB"
                                                size="small"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={'/tx/'+item.tx_hash}>
                                                <LaunchIcon fontSize="inherit" color="Primary"/>
                                            </Link> 
                                        </TableCell>
                                    </TableRow>

                                )}
                            </TableBody>
                        </Table>   
                        </TableContainer>

                    </AccordionDetails>
                </Accordion>

            }


        </div>       
    );

}
