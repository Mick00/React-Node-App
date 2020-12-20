import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Box, CssBaseline} from "@material-ui/core";
import OTONavBar from "./components/OTONavBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from './views/Login'
import CredentialsProvider from "./components/CredentialsProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Config from "./views/Config";
import CommercialCustomers from "./views/CommercialCustomers";
import ResidentialCustomers from "./views/ResidentialCustomers";
import PasswordReset from "./views/PasswordReset";
import SnackBar from "./components/SnackBar";

const theme = createMuiTheme({});

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CredentialsProvider>
                <SnackBar>
                    <CssBaseline/>
                    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                        <OTONavBar/>
                        <Box flex={"1 0 auto"}>
                            <Switch>
                                <Route exact path={"/login"}>
                                    <Login/>
                                </Route>
                                <ProtectedRoute exact permission={"config.security.read"} path={"/configs"}>
                                    <Config/>
                                </ProtectedRoute>
                                <ProtectedRoute exact permission={"customers.commercial.read"} path={"/customers/commercials"}>
                                    <CommercialCustomers/>
                                </ProtectedRoute>
                                <ProtectedRoute exact permission={"customers.residential.read"} path={"/customers/residentials"}>
                                    <ResidentialCustomers/>
                                </ProtectedRoute>
                                <Route exact path={"/reset_password"}>
                                    <PasswordReset/>
                                </Route>
                            </Switch>
                        </Box>
                    </Box>
                </SnackBar>
            </CredentialsProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
