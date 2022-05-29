import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Switch from '@material-ui/core/Switch';

import LaunchIcon from '@material-ui/icons/Launch';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        // minWidth: '100%',
        color: theme.palette.text.secondary,
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
    tableContract: {
        width: '70%',
        border: '',
    },
}));


export default function ComtractMetadataPanel({ data, isLoading }) {

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

            {data.length == 0 && <div> No metadata found</div>} 

            {data.length > 0 && (

            <Table size="small">
                <TableBody>

                    {data.map((item, i) =>
                        <>

                            <TableRow>
                                <TableCell width="40%">
                                    Metadata Saved:
                                </TableCell>
                                <TableCell align="left">
                                    {formatDate(item.saved_at)}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    Developer arddress:
                                </TableCell>
                                <TableCell align="left">
                                    {/* {minimizeStr(item.developer_address)} */}
                                    {item.developer_address}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Rewards address:
                                </TableCell>
                                <TableCell align="left">
                                    {/* {minimizeStr(item.reward_address)} */}
                                    {item.reward_address}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    Collect Premium:
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
                                    Premium percentage charge:
                                </TableCell>
                                <TableCell align="left">
                                    {item.premium_percentage_charged}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="40%">
                                    Gas Rebate to User:
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
                                    Metadata Transaction:
                                </TableCell>
                                <TableCell align="left">
                                    {/* {minimizeStr(item.tx_hash)} */}
                                    {item.tx_hash}
                                    &nbsp;
                                    <Link to={'/tx/'+item.tx_hash}>
                                        <LaunchIcon fontSize="small" color="Primary"/>
                                    </Link>  
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
