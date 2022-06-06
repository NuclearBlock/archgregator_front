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
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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


export default function CodeRelativeContractsPanel({ data, isLoading }) {

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
                Relative Contracts:
            </div>   

            {isLoading && <div className="text-progress">Loading data ...</div>} 

            {data.length == 0 && <div className="loading-result">No data found</div>}
              
            {data.length > 0 && (
                <TableContainer className={classes.container}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="right">Label</TableCell>
                                <TableCell align="center">Creator</TableCell>
                                <TableCell align="center">Admin</TableCell>                        
                                <TableCell align="center">Instantiated</TableCell>
                                <TableCell align="center">Block</TableCell>
                                <TableCell align="right">
                                    <MoreHorizIcon fontSize="small" />      
                                </TableCell>                       
                            </TableRow>
                        </TableHead>
                        <TableBody>    
                        {data.map((item) => (
                            <TableRow hover >

                                <TableCell align="right">
                                    {minimizeStr(item.contract_address)}
                                    <CopyToClipboard textToCopy={item.contract_address} notification="snackbar" />
                                </TableCell> 

                                <TableCell align="right">
                                    {item.label}
                                </TableCell> 

                                <TableCell align="right">
                                    <Hidden xsDown>
                                        {minimizeStr(item.creator, 8, 12)}
                                    </Hidden>
                                    <Hidden smUp>
                                        {minimizeStr(item.creator, 4, 4)}
                                    </Hidden>
                                    <CopyToClipboard textToCopy={item.creator} notification="snackbar" />
                                </TableCell> 

                                <TableCell align="right">
                                    <Hidden xsDown>
                                        {minimizeStr(item.admin, 8, 12)}
                                    </Hidden>
                                    <Hidden smUp>
                                        {minimizeStr(item.admin, 4, 4)}
                                    </Hidden>
                                    <CopyToClipboard textToCopy={item.admin} notification="snackbar" />
                                </TableCell> 

                                <TableCell align="right">
                                    {formatDate(item.instantiated_at)}
                                </TableCell> 

                                <TableCell align="right">
                                    {item.height}
                                </TableCell> 

                                <TableCell align="right">
                                    <Link to={'/contracts/'+item.contract_address}>
                                        <LaunchIcon fontSize="inherit"/>
                                    </Link>
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
