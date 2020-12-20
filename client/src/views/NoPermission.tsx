import React from 'react';
import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(4),
    },
}))

interface NoPermissionProps {
    permission: string,
}

export default function NoPermission(props:NoPermissionProps){
    const classes = useStyle();

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Box>
                <Paper className={classes.wrapper}>
                    <Typography align={"center"} >You lack permission '{props.permission}' to access this page.</Typography>
                </Paper>
            </Box>
        </Box>
    );
}
