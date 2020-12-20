import React, {createContext, useContext, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ISnackBar {
    alertError(msg: string): void;
    alertInfo(msg: string): void;
    alertSuccess(msg: string): void;
    alertWarning(msg: string): void;
}

const SnackbarContext = createContext<ISnackBar>({
    alertError(msg: string) {
        //do nothing
    },
    alertInfo(msg: string) {
        //do nothing
    },
    alertSuccess(msg: string) {
        //do nothing
    },
    alertWarning(msg: string) {
        //do nothing
    }
});

export default function SnackBar(props: any) {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<"error"|"warning"|"info"|"success"|undefined>();
    const [message, setMessage] = useState("");

    const alertError = (msg: string) => {
        alert(msg, "error")
    }

    const alert = (msg: string, severity: "error"|"warning"|"info"|"success") => {
        setOpen(true);
        setSeverity(severity)
        setMessage(msg);
    }

    const alertWarning = (msg: string) => {
        alert(msg, "warning");
    }

    const alertInfo = (msg: string) => {
        alert(msg, "info");
    }

    const alertSuccess = (msg: string) => {
        alert(msg, "success");
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{
                alertError,
                alertWarning,
                alertInfo,
                alertSuccess,
            }}>
            {props.children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useAlert = () => {
    return useContext(SnackbarContext);
}
