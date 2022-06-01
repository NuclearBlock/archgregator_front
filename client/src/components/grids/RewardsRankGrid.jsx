import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LinearProgress } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LaunchIcon from '@material-ui/icons/Launch';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    info: {
        fontSize: '0.8rem',
        color: '#666',
    },
    tooltip: {
        fontsize: '1.2rem',
    },
    grid: {
        paddingBottom: '3px',
        textAlign: 'right',
    },
    gridcenter: {
        paddingBottom: '3px',
        textAlign: 'center',
    },
    switch: {
        marginTop: '20px',
    },
    select: {
        minWidth: '200px',
        textAlign: 'left',
    },
    link: {
        color: '#333',
        '&:hover': { 
            TextDecoder: 'none',
        },
    }
,});

function CustomTooltip(props) {
    const classes = useStyles();
    return <Tooltip arrow classes={classes} {...props} className='tooltip' placement="bottom"/>;
}

export default function RewardsRankGrid() {

    const classes = useStyles();

    const minimizeStr = (str, start = 8, end = 8) => {
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const [rewardsType, setRewardsType] = useState(() => {
        return window.sessionStorage.getItem("rewardsType") || 1
    })

    const [isPremium, setIsPremiun] = useState(() => {
        if (window.sessionStorage.getItem("isPremium") == 'true') {
            return true
        } else if (window.sessionStorage.getItem("isPremium") == 'false') {
            return false
        } else {
            return true
        }    
    })

    const [startDate, setStartDate] = useState(() => {
        let startDate = window.sessionStorage.getItem("startDate")
        if (startDate) {
            return new Date(startDate)
        } else {
            return new Date(2022, 0, 1)
        } 
    })

    const [endDate, setEndDate] = useState(() => {
        let endDate = window.sessionStorage.getItem("endDate")
        if (endDate) {
            return new Date(endDate)
        } else {
            return new Date()
        } 
    })

    const handleRewardsType = (event) => {
        setRewardsType(event.target.value);
        // TO-DO ... ?
        // if (event.target.value == 3) {
        //     setIsPremiun(false);
        // }
    }
    const handleIsPremium = (event) => {
        setIsPremiun(event.target.checked);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        setData(false);
        setIsLoading(true);

        let apiUrl = '/api/rewards/?'
        
        apiUrl += 'type=' + rewardsType
        if (!isPremium) {
            apiUrl += '&premium=' + isPremium
        }

        if (startDate) {
            apiUrl += '&startdate=' + startDate.toISOString()
        }
        if (endDate) {
            apiUrl += '&enddate=' + endDate.toISOString()
        }
        
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            setData(data);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
        });
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        window.sessionStorage.setItem("rewardsType", rewardsType);
        window.sessionStorage.setItem("isPremium", isPremium);
        window.sessionStorage.setItem("startDate", startDate);
        window.sessionStorage.setItem("endDate", endDate);
        fetchData();
    }, [rewardsType, isPremium, startDate, endDate]);
    
    return (

        <>

        {/* {isLoading && <div className="circular-progress"><CircularProgress size="4rem" /></div>}  */}
        
        <Grid item sm={6} spacing={0} className={classes.grid}>
            <Grid container>
                <Grid item xs={6} spacing={0} className={classes.grid}>
                    <FormControl className={classes.select}>
                        <InputLabel id="rewards-type">Rewards type</InputLabel>
                        <Select
                            autoWidth="true"
                            labelId="rewards-type-select-label"
                            id="rewards-type-select"
                            value={rewardsType}
                            onChange={handleRewardsType}
                            >
                            <MenuItem value={1}>All calculations</MenuItem>
                            <MenuItem value={2}>Developer rewards</MenuItem>
                            <MenuItem value={3}>Users fees subsidies</MenuItem>
                        </Select>
                    </FormControl>
                
                </Grid>

                <Grid item xs={6} spacing={0} className={classes.gridcenter}>
                    <FormControlLabel
                        className={classes.switch}
                        value="premium"
                        control={<Switch color="primary" size="small" checked={isPremium} onChange={handleIsPremium}/>}
                        label="Premium contracts"
                        labelPlacement="start"
                        disabled={rewardsType == 3 ? true : false}
                    />
                </Grid> 

            </Grid>
            
        </Grid>

        <Grid item sm={6} spacing={0} className={classes.gridcenter}>
            <Grid container>
                <Grid item xs={6} spacing={0} className={classes.grid}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            // className={classes.picker}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="none"
                            id="start-date-picker"
                            label="Start date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6} spacing={0} className={classes.grid}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="none"
                            id="end-date-picker"
                            label="End date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        </Grid>
        
        {/* {isLoading && <div className="linear-progress"><LinearProgress /></div>}  */}
        {isLoading && <div className="circular-progress"><CircularProgress size="4rem" /></div>} 
        
        {data.length == 0 && <div className="loading-result">No data found</div>} 
        
        {data.length > 0 && (
            <>
            <Grid item xs={12} spacing={0}>
            
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell>
                                Contract Address
                            </TableCell>
                            <TableCell>
                                Contract Label
                            </TableCell>
                            {/* <TableCell>
                                Type
                            </TableCell> */}
                            <TableCell align="center">
                                Calculations&nbsp;<CustomTooltip title="Count of rewards events"><HelpOutlineIcon className={classes.info}/></CustomTooltip>
                            </TableCell>
                            {/* <TableCell>
                                Total Distributed&nbsp;
                                <CustomTooltip title="Total amount of distributed rewards"><HelpOutlineIcon className={classes.info}/></CustomTooltip>
                            </TableCell> */}
                            <TableCell>
                                Total Calculated&nbsp;<CustomTooltip title="Total amount of calculated rewards"><HelpOutlineIcon className={classes.info}/></CustomTooltip>
                            </TableCell>
                            {/* <TableCell>
                                Inflation Rewards&nbsp;<CustomTooltip title="Total amount of inflation rewards"><HelpOutlineIcon className={classes.info}/></CustomTooltip>
                            </TableCell> */}
                            {/* <TableCell>
                                Gas Consumed&nbsp;<CustomTooltip title="Total Gas consumed"><HelpOutlineIcon className={classes.info}/></CustomTooltip>
                            </TableCell> */}
                            <TableCell>
                                Details
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data
                        .map((item, i) => {
                            return (
                            <TableRow hover key={item.id}>
                                <TableCell>
                                    {i+1}
                                </TableCell>
                                <TableCell>
                                    <Link to={"/contracts/"+item.contract_address} className={classes.link}>
                                        {minimizeStr(item.contract_address, 8, 16)}
                                    </Link>  
                                </TableCell>
                                <TableCell>
                                    {item.label}
                                </TableCell>
                                {/* <TableCell>
                                    &nbsp;
                                </TableCell> */}
                                <TableCell align="center">
                                    {item.calculations}
                                </TableCell>
                                {/* <TableCell>
                                    {item.sum_distributed_rewards} utorii
                                </TableCell> */}
                                <TableCell>
                                    {item.sum_calculated_rewards.toFixed(2)}
                                    &nbsp;utorii
                                </TableCell>
                                {/* <TableCell>
                                    {item.sum_inflation_rewards.toFixed(2)}
                                </TableCell> */}
                                {/* <TableCell>
                                    {item.sum_gas_consumed}
                                </TableCell> */}
                                <TableCell>
                                    <Link to={'/rewards/'+item.contract_address}>
                                        See more&nbsp;<LaunchIcon fontSize="inherit"/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            </>
        )}

        </>
    );
}