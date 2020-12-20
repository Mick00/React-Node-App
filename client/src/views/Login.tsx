import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useCredentials} from "../components/CredentialsProvider";
import {useHistory} from "react-router-dom";
import {IUser} from "../data/User";


const useStyle = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(4),
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    field: {
        margin: `${theme.spacing(1)}px 0`,
    },
}))

interface LoginProps {

}

export default function Login(props: LoginProps){

    const [values, setValues] = useState({username: "", password: ""});
    const [error, setError] = useState<string|null>(null);
    const classes = useStyle();
    const {login} = useCredentials();
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]:event.target.value,
        });
    }

    const handleLogin = () => {
        // @ts-ignore
        login(values.username, values.password).then((user: IUser) => {
            if (user?.passwordNeedsReset){
                history.push("/reset_password");
            } else {
                history.push("/dashboard");
            }
        }).catch((e) => setError(e))
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Box>
                <Paper className={classes.wrapper}>
                    <Typography align={"center"} variant={"h3"}>Login</Typography>
                    {error && error}
                    <form noValidate autoComplete="off" className={classes.form}>
                        <TextField label="Username" name="username"
                                   variant="outlined"
                                   value={values.username}
                                   onChange={handleChange}
                                   className={classes.field}
                        />
                        <TextField label="Password" name="password"
                                   variant="outlined"
                                   value={values.password}
                                   onChange={handleChange}
                                   className={classes.field}
                                   type={"password"}
                        />
                        <Box textAlign={"center"}>
                            <Button color={"primary"} variant="contained" onClick={e => handleLogin()}>Log in</Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}
