import {AppBar, Box, Button, IconButton, Theme, Toolbar, Typography} from "@material-ui/core";
import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useCredentials} from "./CredentialsProvider";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyle = makeStyles((theme: Theme) => ({
    links:{
        color: "inherit",
        textDecoration: "inherit",
    },
    buttons: {
        margin: `0 ${theme.spacing(2)}px`,
    }
}))

function OTONavBar(props: any){

    const classes = useStyle();
    const {user, isAuthenticated, logout} = useCredentials();
    return (
        <AppBar position="static">
        <Toolbar>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                <Typography variant="h6">
                    TP3 - Sécurité des réseaux et du web
                </Typography>
                {isAuthenticated()?(
                    <Box mx={5} display={"flex"} flexGrow={"1"} justifyContent={"flex-end"}>
                        {user?.hasPermission("customers.commercial.read") && (
                            <Button color="primary" variant={"contained"} size={"large"} className={classes.buttons}>
                                <Link className={classes.links} to={"/customers/commercials"}>Commercials</Link>
                            </Button>
                        )}
                        {user?.hasPermission("customers.residential.read") && (
                            <Button color="primary" variant={"contained"} size={"large"} className={classes.buttons}>
                                <Link className={classes.links} to={"/customers/residentials"}>Residentials</Link>
                            </Button>
                        )}
                        {
                            user?.hasPermission("config.security.read") && (
                            <Button color="primary" variant={"contained"} size={"large"} className={classes.buttons}>
                                <Link className={classes.links} to={"/configs"}>Admin</Link>
                            </Button>
                        )}
                        <IconButton onClick={logout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Box>
                ):(
                    <Button color="secondary" variant={"contained"} size={"large"} className={classes.buttons}>
                        <Link className={classes.links} to={"/"}>Log in</Link>
                    </Button>
                )}
            </Box>
        </Toolbar>
    </AppBar>
    );
};

export default OTONavBar;
