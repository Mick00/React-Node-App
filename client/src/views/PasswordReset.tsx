import React, {useState} from "react";
import {useCredentials} from "../components/CredentialsProvider";
import {useHistory} from "react-router-dom";
import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {request} from "../request";
import {useAlert} from "../components/SnackBar";

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

export default function PasswordReset(props: any){
    const [values, setValues] = useState({password: "", newPassword: "", newPasswordConfirm: ""});
    const [error, setError] = useState<string|null>(null);
    const classes = useStyle();
    const {user} = useCredentials();
    const history = useHistory();
    const {alertSuccess, alertError} = useAlert();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]:event.target.value,
        });
    }

    const handlePasswordReset = () => {
        request.post("/auth/reset_password", values)
            .then(response => {
                const {data} = response;
                if (data.failed){
                    setError(data.message);
                } else {
                    if (user){
                        user.passwordNeedsReset = false;
                    }
                    alertSuccess("Password changed")
                }
            }).catch((e) => {
                console.log(e);
                alertError("An error happened");
        })
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Box>
                <Paper className={classes.wrapper}>
                    <Typography align={"center"} variant={"h3"}>Change Password</Typography>
                    {error && error}
                    <form noValidate autoComplete="off" className={classes.form}>
                        <TextField label="Old password" name="password"
                                   variant="outlined"
                                   value={values.password}
                                   onChange={handleChange}
                                   className={classes.field}
                                   type={"password"}
                        />
                        <TextField label="New password" name="newPassword"
                                   variant="outlined"
                                   value={values.newPassword}
                                   onChange={handleChange}
                                   className={classes.field}
                                   type={"password"}
                        />
                        <TextField label="Confirm new password" name="newPasswordConfirm"
                                   variant="outlined"
                                   value={values.newPasswordConfirm}
                                   onChange={handleChange}
                                   className={classes.field}
                                   type={"password"}
                        />
                        <Box textAlign={"center"}>
                            <Button color={"primary"} variant="contained" onClick={e => handlePasswordReset()}>Change password</Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}
