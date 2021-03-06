import React from 'react';
import { useParams } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LaunchIcon from '@material-ui/icons/Launch';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ContractRewardsPanel({ data, isLoading }) {

    const params = useParams();

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (

        <div className='panel heigh100'>

            <div className='panel-title'>
                Last Rewards:
            </div>   

            {isLoading && <div className="text-progress">Loading data ...</div>} 

            {data.length == 0 && <div className="loading-result">No data found</div>}
              
            {data.length > 0 && (
                <>
                <Table size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow hover size='small'>
                            <TableCell align="right">
                                Block
                            </TableCell>
                            <TableCell align="right">
                                Distributed amount
                            </TableCell>
                            <TableCell align="right">
                                Details
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                        .map((item, i) => {
                            return (
                            <TableRow key={item.id} hover>
                                {/* <TableCell>
                                    {formatDate(item.reward_date)}
                                </TableCell> */}
                                <TableCell align="right">
                                    {item.height}
                                </TableCell>
                                <TableCell align="right">
                                    {item.distributed_rewards_amount}
                                    {/* TO-DO Fix denom to settings constant */}
                                    &nbsp;utorii
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={'/rewards/'+item.contract_address+'/'+item.height}>
                                        <LaunchIcon fontSize="inherit"/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>

                <div className='see-more'>
                    <Link to={'/rewards/'+params.address}>See all rewards&nbsp;<LaunchIcon fontSize="small"/></Link>
                </div>
                </>
            )}

        </div>
        
    );
}
