import React  from 'react';
import { useParams } from "react-router-dom";

import Hidden from '@material-ui/core/Hidden';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import LaunchIcon from '@material-ui/icons/Launch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

import CopyToClipboard from '../../utils/CopyToClipboard';

const useStyles = makeStyles({
    tooltip: {
        padding: '10px 5px',
        backgroundColor: '#333',
        fontSize: '0.8rem',
    },
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    }
});

const CustomTooltip = (props) => {
    const classes = useStyles();
    return <Tooltip arrow classes={classes} {...props} className='tooltip' placement="top"/>;
}


export default function RewardRelativeExecutionsPanel({ data, isLoading }) {

    const params = useParams();
    const classes = useStyles();

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
                Relative Executions:
            </div>   

            {isLoading && <div className="text-progress">Loading data ...</div>} 

            {data.length == 0 && <div className="loading-result">No data found</div>}
              
            {data.length > 0 && (
                <TableContainer className={classes.container}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Block</TableCell>
                                <TableCell align="right">Sender</TableCell> 
                                <TableCell align="right">Gas Used</TableCell>
                                <TableCell align="right">Fees</TableCell>
                                <TableCell align="center">Message</TableCell>
                                <TableCell align="right">Tx</TableCell>                       
                            </TableRow>
                        </TableHead>
                        <TableBody>    
                        {data.map((row) => (
                            <TableRow hover >
                                <TableCell align="right">
                                    {row.height}
                                </TableCell> 
                                <TableCell align="right">
                                    <Hidden xsDown>
                                        {minimizeStr(row.sender, 8, 12)}
                                    </Hidden>
                                    <Hidden smUp>
                                        {minimizeStr(row.sender, 4, 4)}
                                    </Hidden>
                                </TableCell> 
                                <TableCell align="right">
                                    {row.gas_used}
                                </TableCell> 
                                <TableCell align="right">
                                    {row.fees_amount} {row.fees_denom}
                                </TableCell> 
                                <TableCell align="center">
                                    <CustomTooltip title={JSON.stringify(row.raw_contract_message)}>
                                        <VisibilityIcon fontSize="inherit" color="Primary"/>       
                                    </CustomTooltip>
                                </TableCell> 
                                <TableCell align="right">
                                    <Link to={'/tx/'+row.tx_hash} className={classes.link}>
                                        {minimizeStr(row.tx_hash, 15, 15)}      
                                    </Link>
                                    <CopyToClipboard textToCopy={row.tx_hash} notification="snackbar" /> 
                                </TableCell>                     
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        </div>
        
    );
}
