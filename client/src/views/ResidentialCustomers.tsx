import React, {useEffect, useState} from 'react';
import {request} from "../request";
import {Box, Grid, Typography} from "@material-ui/core";
import {IResidentialCustomer} from "../data/Customer";
import {useAlert} from "../components/SnackBar";

export default function ResidentialCustomers() {

    const [customers, setCustomers] = useState<IResidentialCustomer[]>([]);
    const {alertError} = useAlert();

    useEffect(()=>{
        request.get("/customers/residential")
            .then(res => setCustomers(res.data))
            .catch(()=>{
                alertError("Could not load resources")
            });
    }, []);

    return (
        <>
            <Typography variant={"h3"}>Residential Customers</Typography>
            <Grid container>
                {customers.map(customer => (
                    <Grid item xs={12} key={customer.name+customer.phone}>
                        <Grid container>
                            <Grid item xs={4}>
                                {customer.name}
                            </Grid>
                            <Grid item xs={4}>
                                {customer.phone}
                            </Grid>
                            <Grid item xs={4}>
                                {customer.address}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
