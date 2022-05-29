import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import PollIcon from '@material-ui/icons/Poll';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import CodeIcon from '@material-ui/icons/Code';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },    
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        fontSize: '1em',
        backgroundColor: theme.palette.common.black,
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
            <Grid container spacing={0}>
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
        </aside>

    );
}
