export interface IResidentialCustomer {
    name: string,
    address: string,
    phone: string,
}

export interface ICommercialCustomer extends IResidentialCustomer {
    business: string,
}
