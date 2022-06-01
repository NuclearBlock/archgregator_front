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
import Hidden from '@material-ui/core/Hidden';

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


export default function ComtractMetadataPanel({ data, isLoading }) {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute:'2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    const classes = useStyles();

    return (

        <div className="panel">
   
            <div className="panel-title">
                Rewards Calculation Details
            </div>

            {isLoading && <div className="linear-progress"><LinearProgress /></div>} 

            {data.length == 0 && <div className="loading-result"> No data found</div>} 

            {data.length > 0 && (

            <Table size="small">
                
                    <>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell width="100%">Main Data</TableCell>                     
                        </TableRow>
                    </TableHead>

                    <TableBody>
                
                        <TableRow>
                            <TableCell width="40%">
                                <Hidden xsDown >Rewads </Hidden>Calculated for block:
                            </TableCell>
                            <TableCell align="left">
                                {data[0].height}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell width="40%">
                                Rewards type:
                            </TableCell>
                            <TableCell align="left">
                                <span className="semibold">
                                    {data[0].gas_rebate_to_user
                                        ? 'User\'s Fees subsidies'
                                        : 'Developer Rewards'
                                    }
                                </span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell width="40%">
                                Smart contract<Hidden xsDown > address</Hidden>:
                            </TableCell>
                            <TableCell align="left">
                                <Link to={"/contracts/"+data[0].contract_address} className={classes.link}>
                                    <Hidden xsDown >
                                        {data[0].contract_address}
                                    </Hidden> 
                                    <Hidden smUp >
                                        {minimizeStr(data[0].contract_address, 8, 14)}
                                    </Hidden> 
                                </Link> 
                            </TableCell>
                        </TableRow>

                    </TableBody>

                    {!data[0].gas_rebate_to_user && (
                        <>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell width="100%">
                                    <Hidden xsDown >Rewards </Hidden>metadata
                                </TableCell>                     
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            <TableRow>
                                <TableCell width="40%">
                                    Developer<Hidden xsDown > address</Hidden>:
                                </TableCell>
                                <TableCell align="left">
                                    <Hidden xsDown >
                                        {data[0].developer_address}
                                    </Hidden> 
                                    <Hidden smUp >
                                        {minimizeStr(data[0].developer_address, 8, 14)}
                                    </Hidden> 
                                </TableCell>
                            </TableRow>
                        
                            <TableRow>
                                <TableCell width="40%">
                                    Rewards address:
                                </TableCell>
                                <TableCell align="left">
                                    <Hidden xsDown >
                                        {data[0].reward_address}
                                    </Hidden> 
                                    <Hidden smUp >
                                        {minimizeStr(data[0].reward_address, 8, 14)}
                                    </Hidden> 
                                </TableCell>
                            </TableRow>

                            {/* <TableRow>
                                <TableCell width="40%">
                                    <Hidden xsDown >Collect </Hidden>Premium:
                                </TableCell>
                                <TableCell align="left">
                                    <Switch
                                        checked={data[0].collect_premium}
                                        color="primary"
                                        name="checkedB"
                                        size="small"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                            </TableRow> */}

                            {data[0].premium_percentage_charged > 0 && (
                                <TableRow>
                                    <TableCell width="40%">
                                        Premium<Hidden xsDown > percentage charged</Hidden>:
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className="semibold">
                                            {data[0].premium_percentage_charged} %
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                        </>
                    )}

                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell width="100%">Calculations:</TableCell>                     
                        </TableRow>
                    </TableHead>

                    {/* <h4>Calculations</h4> */}

                    <TableBody>
                        {data.map((item, i) =>
                            <TableRow>
                                <TableCell width="40%">
                                    &nbsp;&nbsp;<Hidden xsDown >Calculation </Hidden>amount #{i+1}:
                                </TableCell>
                                <TableCell align="left">
                                    {item.contract_rewards_amount}
                                    &nbsp;
                                    {item.contract_rewards_denom}
                                </TableCell>
                            </TableRow>
                        )
                        }
                        <TableRow>
                            <TableCell width="40%">
                                <span className="semibold uppercase">
                                    Distributed<Hidden xsDown >  amount</Hidden>:
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span className="semibold">
                                    {data[0].distributed_rewards_amount}
                                    &nbsp;
                                    {data[0].contract_rewards_denom}
                                </span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell width="40%">
                                Leftover amount:
                            </TableCell>
                            <TableCell align="left">
                                {data[0].leftover_rewards_amount}
                                &nbsp;
                                {data[0].contract_rewards_denom}
                            </TableCell>
                        </TableRow>

                    </TableBody>
                    </>    
            </Table>

            )}
       
        </div>       
    );

}
