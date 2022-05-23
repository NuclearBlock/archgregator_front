import React from 'react';
import { Routes, Route, } from "react-router-dom";
import { Container } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
// import './App.css';

import Top from './components/Top'
import Header from './components/Header'
import SidePanel from './components/SidePanel'
import Footer from './components/Footer'

import Dashboard from './components/dashboard/Dashboard'
import RewardsRankPage from './pages/RewardsRankPage'
import ContractsRankPage from './pages/ContractsRankPage'
import ContractInfoPage from './pages/ContractInfoPage'
import CodesRankPage from './pages/CodesRankPage'
import ContractsExecutionsPage from './pages/ContractExecutionsPage';
import ContractRewardsPage from './pages/ContractRewardsPage';
import Page404 from './pages/Page404';
import TxPage from './pages/TxPage'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    main: {
        minHeight: '90%',
    }
}));

const theme = createTheme({
    palette: {
      primary: {
        main: '#f1592a',
      },
      secondary: {
        main: '#ccc',
        contrastText: '#666',
      },
    },
  });

function App() {

   const classes = useStyles();

  return (

    <div className="App"> 
        <ThemeProvider theme={theme}>
            <Top />
            <Header />
            <Container maxWidth="lg">
                {/* <div className="AppMain"> */}
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={1} spacing={0}>
                      <SidePanel />
                    </Grid>
                    <Grid item xs={12} sm={11} spacing={0} className={classes.main}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/rewards" element={<RewardsRankPage />} />
                                <Route path="/rewards/:address" element={<ContractRewardsPage />} />
                            <Route path="/contracts" element={<ContractsRankPage />} />
                                <Route path="/contracts/:address" element={<ContractInfoPage />} />
                            <Route path="/codes" element={<CodesRankPage />} />
                            <Route path="/executions/:address" element={<ContractsExecutionsPage />} />
                            <Route path="/tx/:hash" element={<TxPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Grid>
                </Grid>
                {/* </div> */}
            </Container>
            <Footer />
        </ThemeProvider>
      
    </div>
  );
}

export default App;
