import React  from 'react';
import { useParams } from "react-router-dom";

import Hidden from '@material-ui/core/Hidden';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';


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

            {isLoading && <div className="circular-progress"><CircularProgress size="3rem" /></div>} 

            {data.length == 0 && <div className="loading-result">No data found</div>}
              
            {data.length > 0 && (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Block</TableCell>
                            <TableCell align="right">Sender</TableCell> 
                            <TableCell align="right">Gas Used</TableCell>
                            {/* <TableCell align="right">Fees</TableCell> */}
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
                                    {minimizeStr(row.sender)}
                                </Hidden>
                                <Hidden smUp>
                                    {minimizeStr(row.sender, 4, 4)}
                                </Hidden>
                            </TableCell> 
                            <TableCell align="right">
                                {row.gas_used}
                            </TableCell> 
                            {/* <TableCell align="right">
                                {row.fees_amount}
                            </TableCell>  */}
                            <TableCell align="right">
                                <Link to={'/tx/'+row.tx_hash}>
                                    <LaunchIcon fontSize="inherit" color="Primary"/>
                                </Link>          
                            </TableCell>                     
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}

        </div>
        
    );
}
