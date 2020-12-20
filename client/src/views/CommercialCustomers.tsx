import React, {useEffect, useState} from 'react';
import {request} from "../request";
import {Box, Grid, Typography} from "@material-ui/core";
import {ICommercialCustomer} from "../data/Customer";
import {useAlert} from "../components/SnackBar";

export default function CommercialCustomers() {

    const [customers, setCustomers] = useState<ICommercialCustomer[]>([]);
    const {alertError} = useAlert();

    useEffect(()=>{
        request.get("/customers/commercial")
            .then(res => setCustomers(res.data))
            .catch(()=>{
                alertError("Could not load resources")
            });;
    }, []);

    return (
        <>
            <Typography variant={"h3"}>Commercial Customers</Typography>
            <Grid container>
                {customers.map(customer => (
                    <Grid item xs={12} key={customer.name+customer.phone}>
                        <Grid container>
                            <Grid item xs={3}>
                                {customer.name}
                            </Grid>
                            <Grid item xs={3}>
                                {customer.business}
                            </Grid>
                            <Grid item xs={3}>
                                {customer.phone}
                            </Grid>
                            <Grid item xs={3}>
                                {customer.address}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
