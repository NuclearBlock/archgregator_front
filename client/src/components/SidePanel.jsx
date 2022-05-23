import React from 'react';
import Link from '@material-ui/core/Link';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import WidgetsIcon from '@material-ui/icons/Widgets';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PollIcon from '@material-ui/icons/Poll';
import TimelineIcon from '@material-ui/icons/Timeline';
import TableChartIcon from '@material-ui/icons/TableChart';
import NotesIcon from '@material-ui/icons/Notes';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import CodeIcon from '@material-ui/icons/Code';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },    
    paper: {
        padding: '10px 0',
        textAlign: 'center',
        border: 'none',
        // height: '110%',
        // minHeight: '100vh',
        // color: theme.palette.text.secondary,
    },
    [theme.breakpoints.between("sm", "lg")]: {
        height: 'calc(110% + 100px)',
        minHeight: '100vh',
    },
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        fontSize: '1em',
        backgroundColor: theme.palette.common.black,
    },
    sidepanel: {
        // minHeight: '100%'
    },
    sidepanelIcon: {
        //width: '100vh',
    },
    icon: {
        color: '#333',
        fontSize: '2.5rem',
        '&:hover': {
            color: '#f1592a',
            TransitionEvent: 'all 0.3s'
        } 
    }
}));

function RightTooltip(props) {
    const classes = useStyles();
    return <Tooltip arrow classes={classes} {...props} placement="right"/>;
}

export default function SidePanel() {

    const classes = useStyles();
  
    return (
        <aside>
        {/* <Grid item xs={12} sm={3} spacing={0} className={classes.sidepanel}> */}
            
            <Paper square variant="outlined" className={classes.paper}>
                <Grid container spacing={0} className={classes.sidepanel}>
                    <Grid item xs={3} sm={12} spacing={0}>
                        <Link component={RouterLink} to="/">
                            <RightTooltip title="Dashboard">
                                <IconButton>
                                    <PollIcon justifyContent="center" className={classes.icon}/>
                                </IconButton>
                            </RightTooltip>    
                        </Link> 
                    </Grid>

                    <Grid item xs={3} sm={12} spacing={0}>
                        <Link component={RouterLink} to="/rewards">
                            <RightTooltip title="Rewards">
                                <IconButton>
                                    <FlipCameraAndroidIcon className={classes.icon}/>
                                </IconButton>
                            </RightTooltip>
                        </Link>
                    </Grid>

                    <Grid item xs={3} sm={12} spacing={0}>
                        <Link component={RouterLink} to="/contracts">
                            <RightTooltip title="Contracts">
                                <IconButton>
                                    <DeveloperBoardIcon className={classes.icon}/>
                                </IconButton>
                            </RightTooltip>  
                        </Link>
                    </Grid>

                    <Grid item xs={3} sm={12} spacing={0}>
                        <Link component={RouterLink} to="/codes">
                            <RightTooltip title="Codes">
                                <IconButton>
                                    <CodeIcon className={classes.icon}/>
                                </IconButton>
                            </RightTooltip>  
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        {/* </Grid> */}
        </aside>

    );
}
