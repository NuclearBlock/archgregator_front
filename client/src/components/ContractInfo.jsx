import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';


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


export default function ComtractInfo() {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatAddr = (address) => {
        return address.slice(0, 8) + "..." + address.slice(-16)
    }

    const classes = useStyles();
    const params = useParams();

    const [contractData, setContractData] = useState([]);
    const [isContractDataLoading, setIsContractDataLoading] = useState(false);
    const [isContractDataError, setIsContractDataError] = useState(false);

    const fetchContractData = () => {

        let contractUrl = '/api/contracts/' + params.address
        fetch(contractUrl)
        .then((response) => response.json())
        .then((data) => {
            setIsContractDataLoading(false);
            setContractData(data);
        })
        .catch((error) => {
            setIsContractDataLoading(false);
            setIsContractDataError(true);
            console.log(error);
        });
    };

    const [contractMetaData, setContractMetaData] = useState([]);
    const [isContractMetaDataLoading, setIsContractMetaDataLoading] = useState(false);
    const [isContractMetaDataDataError, setIsContractMetaDataError] = useState(false);

    const fetchMetadata = () => {

        let metadataUrl = '/api/contracts/metadata/' + params.address
        fetch(metadataUrl)
        .then((response) => response.json())
        .then((data) => {
            setIsContractMetaDataLoading(false);
            setContractMetaData(data);
        })
        .catch((error) => {
            setIsContractMetaDataLoading(false);
            setIsContractMetaDataError(true);
            console.log(error);
        });
    };


    useEffect(() => {
        fetchContractData();
        fetchMetadata();
    }, []);

    if (isContractMetaDataLoading) {
        return <div>Loading data...</div>;
    }

    if (isContractDataLoading) {
        return <div>Loading data...</div>;
    }

    return (
        <>
   
                <Paper variant="outlined" square className={classes.paper}> 


                    <Typography variant="button">
                        Contract Data:
                    </Typography>
                    <br/>


                    <Table className={classes.table} size="small">
                        <TableBody>
                           
                            {contractData.map((item, i) =>
                                <>
                                    {item.label != ''
                                    ?<TableRow >
                                        <TableCell width="40%">
                                            Label:
                                        </TableCell>
                                        <TableCell align="left">
                                            <Chip
                                                size="small"
                                                label={item.label}
                                                color="primary"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    : null
                                    }
                                
                                    <TableRow>
                                        <TableCell width="40%">
                                            Wasm code used:
                                        </TableCell>
                                        <TableCell align="left">
                                            #{item.code_id}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Creator address
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatAddr(item.creator)}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Admin address:
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatAddr(item.admin)}
                                        </TableCell>
                                    </TableRow>
                                </>
                            )[0]}

                        </TableBody>
                    </Table>

                    <br/>
                {/* </Paper>
                
                <br/>

                <Paper variant="outlined" square className={classes.paper}>  */}

                    <Typography variant="button">
                        Current Metadata Settings:
                    </Typography>
                    <br/>

                    <Table className={classes.table} size="small">
                        <TableBody>

                            {contractMetaData.map((item, i) =>
                                <>
                                    <TableRow>
                                        <TableCell width="40%">
                                            Developer arddress:
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatAddr(item.developer_address)}
                                            {/* {item.developer_address} */}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Rewards address:
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatAddr(item.reward_address)}
                                            {/* {item.reward_address} */}
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
                                            Premium %
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.premium_percentage_charged}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width="40%">
                                            Gas Rebate to User
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

                                </>
                            )[0]}

                        </TableBody>
                    </Table>

                </Paper>

       
        </>       
    );

}
