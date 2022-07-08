import React from 'react';
import { Routes, Route, } from "react-router-dom";
import { Container } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
// import './App.css';

import Top from './components/Top'
import Header from './components/Header'
import NavPanel from './components/NavPanel'
import Footer from './components/Footer'

import Dashboard from './components/dashboard/Dashboard'
import RewardsRankPage from './pages/RewardsRankPage'
import ContractsRankPage from './pages/ContractsRankPage'
import ContractInfoPage from './pages/ContractInfoPage'
import CodesRankPage from './pages/CodesRankPage'
import ContractsExecutionsPage from './pages/ContractExecutionsPage';
import ContractRewardsPage from './pages/ContractRewardsPage';
import RewardPage from './pages/RewardPage';
import CodePage from './pages/CodePage';
import TxPage from './pages/TxPage';
import PageSearchNotFound from './pages/PageSearchNotFound';
import Page404 from './pages/Page404';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';


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

  return (

    <div className="App"> 
      <ThemeProvider theme={theme}>
        <Top />
        <Header />

        <nav id="nav-panel">
          <NavPanel />
        </nav>

        <div id="content">
          {/* <div className="AppMain"> */}
          <Grid container spacing={1}>
            <Grid item sm={12} spacing={0}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rewards" element={<RewardsRankPage />} />
                  <Route path="/rewards/:address" element={<ContractRewardsPage />} />
                    <Route path="/rewards/:address/:block" element={<RewardPage />} />
                <Route path="/contracts" element={<ContractsRankPage />} />
                    <Route path="/contracts/:address" element={<ContractInfoPage />} />
                <Route path="/codes" element={<CodesRankPage />} />
                  <Route path="/codes/:code_id" element={<CodePage />} />
                <Route path="/executions/:address" element={<ContractsExecutionsPage />} />
                <Route path="/tx/:tx_hash" element={<TxPage />} />
                <Route path="not-found" element={<PageSearchNotFound />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Grid>
          </Grid>
          {/* </div> */}
        </div>
        <Footer />
      </ThemeProvider> 
    </div>
  );
}

export default App;
