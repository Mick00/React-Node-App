import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@material-ui/core";
import {request} from "../request";
import {makeStyles} from "@material-ui/core/styles";
import {IUser} from "../data/User";
import {useAlert} from "../components/SnackBar";

const configLabel = {
    jwtExpiry: "Valid session length",
    maxConnectionAttempts: "Max connection attempt before timeout",
    connectionTimeout: "How long does the timeout lasts",
    passwordMinLength: "Password minimum length",
    passwordNeedsSpecial: "Password needs special character"
}

const useStyle = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
    },
    actionBtn: {
        margin: theme.spacing(1),
    },
    row: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.grey[100]
    }
}))

export default function Config(){

    const classes = useStyle();
    const [config, setConfig] = useState<any>({
        jwtExpiry: "3600s",
        maxConnectionAttempts: 3,
        connectionTimeout: 10,
        passwordMinLength: 8,
        passwordNeedsSpecial: true,
    });
    const [submitMessage, setSubmitMessage ] = useState<string|null>(null);
    const [users, setUsers ] = useState<IUser[]>([]);
    const {alertSuccess, alertError} = useAlert();

    useEffect(()=>{
        request.get("/options/security")
            .then(res => setConfig(res.data));
    }, [])

    useEffect(()=>{
        refreshUser();
    }, [])

    const refreshUser = () => {
        return request.get("/users/")
            .then(res => setUsers(res.data));
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [event.target.name]: event.target.value,
        });
    }

    const submit = () => {
        request.post("/options/security", {config})
            .then(() => setSubmitMessage("Update successfull"))
            .catch(() => setSubmitMessage("Update failed"));
    }

    const toggleDisabled = (user: IUser) => {
        request.post(`/users/${user.username}/disable`,{disabled: !user.disabled})
            .then(() => {
                refreshUser();
                alertSuccess(user.username+" is now "+(!user.disabled?"enabled":"disabled"));
            })
            .catch(() => {
                alertError("No permission");
            });
    }

    const forceReset = (user: IUser)=> {
        request.post(`/users/${user.username}/forcePasswordReset`,{passwordNeedsReset: true})
            .then(() => {
                refreshUser();
                alertSuccess(user.username+" will need to reset his password on next login");
            })
            .catch(() => {
                alertError("No permission");
            });
    }

    return (
        <Box m={"20px auto"} maxWidth={"1000px"}>
            <Typography variant={"h3"} component={"h1"}>Admin</Typography>
            <Typography variant={"h4"} component={"h2"}>Config</Typography>
            {submitMessage && (<Typography>{submitMessage}</Typography>)}
            <form noValidate autoComplete="off" className={classes.form}>
                <TextField
                    name={"jwtExpiry"}
                    label={configLabel.jwtExpiry}
                    value={config.jwtExpiry}
                    onChange={handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name={"maxConnectionAttempts"}
                    label={configLabel.maxConnectionAttempts}
                    value={config.maxConnectionAttempts}
                    onChange={handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name={"connectionTimeout"}
                    label={configLabel.connectionTimeout}
                    value={config.connectionTimeout}
                    onChange={handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name={"passwordMinLength"}
                    label={configLabel.passwordMinLength}
                    value={config.passwordMinLength}
                    onChange={handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={config.passwordNeedsSpecial}
                            onChange={() => setConfig({...config, passwordNeedsSpecial:!config.passwordNeedsSpecial})}
                            name="passwordNeedsSpecial" />
                    }
                    label={configLabel.passwordNeedsSpecial}
                />
                <Box textAlign={"center"}>
                    <Button color={"primary"} variant="contained" onClick={e => submit()}>Update</Button>
                </Box>
            </form>
            <Typography variant={"h4"} component={"h2"}>Users</Typography>
            <Box>
                {users.map(user => (
                    <Grid container className={classes.row}>
                        <Grid item xs={6}>
                            {user.username}
                        </Grid>
                        <Grid item xs={6}>
                            <Button color={"primary"}
                                    variant="contained"
                                    className={classes.actionBtn}
                                    onClick={e => toggleDisabled(user)}>
                                {user.disabled?"Enable":"Disable"}
                            </Button>
                            <Button color={"primary"}
                                    variant="contained"
                                    className={classes.actionBtn}
                                    onClick={e => forceReset(user)}
                                    disabled={user.passwordNeedsReset}
                            >
                                Force password reset
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
}
